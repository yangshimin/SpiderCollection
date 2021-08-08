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

const js_code = fs.readFileSync("F:\\code\\SpiderCollection\\数美滑块\\captcha.js", {
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

// 函数的参数替换

new_ast = parser.parse(generator(new_ast).code);
// 函数的形参列表
let argumentsList = new_ast.program.body[0].expression.argument.callee.params;
// 函数的实参列表
let realArgumentList = new_ast.program.body[0].expression.argument.arguments;

// 替换过后发现字符串好像都是倒序了，检查原始代码发现有两个for循环对传入的参数做处理的过程
// 这里直接把相关代码拿出来提前做好计算 然后删除代码中的操作
let temp = []
realArgumentList.map(function (n){
    if(n.type === 'StringLiteral'){
        value = n.value;
    }else{
        value = eval(generate_js([n]));
    }
    temp.push(value);
})
var _0x450a3e = temp, _0x3ff3d5;

// 如果某个值类型是字符串 就把字符串的字符顺序倒序
for (_0x3ff3d5 = 0; _0x3ff3d5 < 1283; _0x3ff3d5++) {
    typeof _0x450a3e[_0x3ff3d5] === "string" && (_0x450a3e[_0x3ff3d5] = _0x450a3e[_0x3ff3d5]["split"]("")["reverse"]()["join"](""));
}

// 把除最后10个之外的参数全部倒序
for (_0x3ff3d5 = 0; _0x3ff3d5 < (1283 / 2); _0x3ff3d5++) {
    var _0xf4cda9 = _0x450a3e[_0x3ff3d5];
    _0x450a3e[_0x3ff3d5] = _0x450a3e[1283 - _0x3ff3d5 - 1], _0x450a3e[1283 - _0x3ff3d5 - 1] = _0xf4cda9;
}

// 把正确的参数顺序重新赋值给realArgumentList
realArgumentList = temp;
// 删除原始代码中的两个for循环及相关代码
new_ast.program.body[0].expression.argument.callee.body.body.splice(4, 3)

// 把形参和实参一一对应
let argumentsMap = {};
for (var i=0; i < argumentsList.length; i++){
    var value = "";
    var key = argumentsList[i].name;
    argumentsMap[key] = realArgumentList[i];
}
// 删除函数的形参和实参
new_ast.program.body[0].expression.argument.callee.params = [];
new_ast.program.body[0].expression.argument.arguments = [];

// 遍历所有的identifier, 如果存在于argumentsMap中就替换调
new_ast = parser.parse(generator(new_ast).code);
traverse(new_ast, {
    Identifier(path){
        let name = path.node.name;
        let realValue = argumentsMap[name];
        if (realValue !== undefined){
            console.log("[替换]:", realValue)
            path.replaceWith(t.valueToNode(realValue))
        }
    }
})

code = generator(new_ast).code
// 删除一些垃圾代码 但存在这么一种情况 a = b; c = a; 但c在代码中没有其他地方引用 所以用for循环多删几次 总能删干净
for (var i =0; i <=3; i++){
    new_ast = parser.parse(generator(new_ast, opts = {jsescOption:{"minimal":true}}).code);
    traverse(new_ast, {
        Identifier(path){
            let name = path.node.name;
            let binding = path.scope.getBinding(name);
            // 没有被引用且没有对这个变量进行修改的地方且父级path不是指定特殊情况, 如此则删除这个垃圾代码
            if (binding && !binding.referenced && binding.constantViolations.length === 0 &&
                !(t.isFunctionExpression(path.parentPath) || t.isCatchClause(path.parentPath))){
                path.parentPath.remove();

            }
        }
    })
}

// 花指令解密
// 生成totalObj
new_ast = parser.parse(generator(new_ast, opts = {jsescOption:{"minimal":true}}).code)
let totalObj = {}
function generateTotalObj(ast){
    traverse(ast, {
        VariableDeclarator(path){
            let name = path.node.id.name;
            let init = path.node.init;
            if (!t.isObjectExpression(init)) return;
            let binding = path.scope.getBinding(name);
            if (!binding) return;
            if (!totalObj[name]){
                totalObj[name] = {}
            }

            binding.referencePaths.map(function (p){
                if (t.isAssignmentExpression(p.parentPath.parent)){
                    let propertiesKey = p.parentPath.parent.left.property.value;
                    let right = p.parentPath.parent.right;

                    if (t.isStringLiteral(right)){
                        // 当键值为字符串时
                        totalObj[name][propertiesKey] = right;
                    }else if(t.isFunctionExpression(right)){
                        // 当键值为函数时
                        value = right.body.body[0].argument
                        totalObj[name][propertiesKey] = value;
                    }else if(t.isMemberExpression(right)){
                        let objectName = right.object.name;
                        let propertyName = right.property.value;
                        value = totalObj[objectName]?totalObj[objectName][propertyName]?totalObj[objectName][propertyName]:"":"";
                        if (value){
                            totalObj[name][propertiesKey] = value
                        }
                    }
                }else{
                    let parentNode = p.parentPath.node;
                    if (t.isVariableDeclarator(parentNode)){
                        // 当存在key值复制时
                        let name = parentNode.id.name;
                        let init = parentNode.init.name;
                        if (totalObj[init]){
                            totalObj[name] = totalObj[init];
                        }
                    }
                }
            })
            if (JSON.stringify(totalObj[name])  === '{}'){
                delete totalObj[name]
            }
        }
    })

}

new_ast = parser.parse(generator(new_ast).code);
generateTotalObj(new_ast)

// 函数花指令替换
code = generator(new_ast, opts = {jsescOption:{"minimal":true}}).code
new_ast = parser.parse(code)

function findRealValue(node){
    let objectName = "";
    let properties = "";
    try{
        objectName = node.object.name;
        properties = node.property.value;
    }catch (e) {
        return false
    }

    if (totalObj[objectName] && totalObj[objectName][properties]){
        console.log("[READY]要进行函数花指令替换的节点类型为:", totalObj[objectName][properties].type);
        if (t.isCallExpression(totalObj[objectName][properties])){
            let arguments = totalObj[objectName][properties].arguments;
            if (!arguments) return;
            let callee = totalObj[objectName][properties].callee;
            if (!callee) return;
            if (t.isMemberExpression(callee)){
                return findRealValue(callee);
            }
            return totalObj[objectName][properties];
        }else if (t.isBinaryExpression(totalObj[objectName][properties]) || t.isLogicalExpression(totalObj[objectName][properties])){
            let left = totalObj[objectName][properties].left;
            let right = totalObj[objectName][properties].right;
            if (t.isIdentifier(left) && t.isIdentifier(right)){
                return totalObj[objectName][properties];
            }
        }else{
            console.log(totalObj[objectName][properties])
        }
    }else{
        return node;
    }
}

traverse(new_ast, {
    CallExpression(path){
        let arguments = path.node.arguments;
        if (!arguments) return;
        let callee = path.node.callee;
        if (!callee) return;
        console.log("[READY]准备进行函数花指令替换:", path.toString());
        let returnExpr = findRealValue(callee)
        if (returnExpr && (t.isBinaryExpression(returnExpr) || t.isLogicalExpression(returnExpr))){
            let returnExprType = returnExpr.type;
            let binExpr = t[returnExprType](returnExpr.operator, arguments[0], arguments[1]);
            path.replaceWith(binExpr);
            console.log("[SUCCESS]函数花指令替换:", path.toString())
        }else if(t.isCallExpression(returnExpr)){
            if (arguments.length > returnExpr.arguments.length){
                let newArr = path.node.arguments.slice(1);
                let callExpr = t.callExpression(arguments[0], newArr);
                path.replaceWith(callExpr);
                console.log("[SUCCESS]函数花指令替换:", path.toString())
            }else{
                console.log(returnExpr)
            }
        }
    },
    MemberExpression(path){
        console.log("[READY]准备进行函数花指令替换:", path.toString());
        let ObjectName = path.node.object.name;
        let propertyValue = path.node.property.value;
        if (!t.isAssignmentExpression(path.parentPath) && totalObj[ObjectName] && totalObj[ObjectName][propertyValue]){
            path.replaceWith(totalObj[ObjectName][propertyValue]);
            console.log("[SUCCESS]函数花指令替换:", path.toString())
        }
    }
})


code = generator(new_ast).code
// new_ast = parser.parse(code);
console.log(code)