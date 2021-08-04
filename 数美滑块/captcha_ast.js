const fs = require('fs');
// 解析js,将js代码转换为AST
// parser的parse方法有第二个参数sourceType, 当js代码中含有import、export (es6的代码)等关键字时
// 需要指定sourceType为module
const parser = require("@babel/parser");
// 用来遍历AST中的节点
const traverse = require("@babel/traverse").default;
// 用来判断节点类型和生成新的节点等
const t = require("@babel/types");
// 用来把AST代码转换成JS代码
// generator 也有其他参数，具体参考文档: https://babeljs.io/docs/en/@babel-generator
const generator = require("@babel/generator").default;

const js_code = fs.readFileSync("./captcha.js", {
    encoding: "utf-8"
});
let ast = parser.parse(js_code);

function generate_js(astObjList){
    // 初始话一个空的AST对象
    let newAst = parser.parse("");
    // 放入到空的AST对象中 再转为js eval加载到内存中
    astObjList.map(function(p){newAst.program.body.push(p);})
    let code = generator(newAst, {compact: true}).code;
    return code;
}

// 获取解密相关的JS代码
let decrypt_func_name = ast.program.body[1].declarations[0].init.name;
let decrypt_func_name_copy = decrypt_func_name;
let decrypt_list = ast.program.body.slice(0,4)
let decrypt_code = generate_js(decrypt_list)

// 将解密的相关代码加载到内存中
eval(decrypt_code)

let new_ast = parser.parse(generate_js(ast.program.body.slice(4, ast.program.body.length)))

// 字符串解密
function decryptReplace(path, decrypt_func_name){
    let varInit = path.node.init;
    if (varInit && varInit.name !== decrypt_func_name) return;
    let name = path.node.id.name;
    let varBind = path.parentPath.scope.getBinding(name);
    if (varBind && varBind.referencePaths.length >= 0){
        varBind.referencePaths.map(function (p){
            let referenceParentType = p.parentPath.type;
            if (referenceParentType === 'CallExpression'){
                let arguments = p.parentPath.node.arguments;
                if (arguments.length !== 1 || p.parentPath.node.callee.type !== 'Identifier') return
                let argu = p.parentPath.node.arguments[0].extra.raw;
                let realValue = eval(decrypt_func_name_copy + "(" + argu + ")");
                p.parentPath.replaceWith(t.valueToNode(realValue))
            }else if (referenceParentType === 'VariableDeclarator'){
                let temp = p.parentPath.node.init.name;
                if (!temp) return;
                decryptReplace(p.parentPath, temp)
            }else{
                console.log("reference parent type is", referenceParentType)
            }
        })
    }
}

traverse(new_ast, {
    VariableDeclarator(path){
        decryptReplace(path, decrypt_func_name);
    }
})

// 花指令解密
// 生成totalObj
let totalObj = {}
function generateTotalObj(ast){
    traverse(new_ast, {
        AssignmentExpression(path){
            if (path.node.left && t.isMemberExpression(path.node.left)){
                let objName = path.node.left.object.name;
                let objKeyName = path.node.left.property.value;
                if (!totalObj[objName]){
                    totalObj[objName] = {};
                }
                if (objName && objKeyName && totalObj[objName] && totalObj[objName][objKeyName]) return;
                if (t.isStringLiteral(path.node.right)){
                    // 字符串花指令
                    totalObj[objName][objKeyName] = path.node.right.value;

                }else if (t.isFunctionExpression(path.node.right)){
                    // 函数花指令
                    totalObj[objName][objKeyName] = path.node.right
                }
            }
        }
    })

}

new_ast = parser.parse(generator(new_ast).code);
generateTotalObj(new_ast)


// traverse(new_ast, {
//     CallExpression(path){
//         let callee = path.node.callee;
//         if (!callee || callee.name !== '_0x1cdd89') return;
//         let arg = path.node.arguments;
//         if (!arg) return;
//         let rawValue = arg[0].extra.rawValue
//         let realValue = _0x54be(rawValue);
//         if (typeof(realValue) === "number"){
//             path.replaceWith(t.NumericLiteral(realValue));
//         }else if(typeof(realValue) === "string"){
//             path.replaceWith(t.StringLiteral(realValue));
//         }else{
//             throw Error("存在其他数据类型的结果")
//         }
//     }
// })

code = generator(new_ast).code
// new_ast = parser.parse(code);
console.log(code)