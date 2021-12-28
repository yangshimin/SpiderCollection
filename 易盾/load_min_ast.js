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

const js_code = fs.readFileSync("E:\\个人\\SpiderCollection\\易盾\\core_min.js", {
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
let decrypt_func_name = ast.program.body[1].id.name;
let execute_body_code = ast.program.body[2].expression.expressions.pop()
let decrypt_list = ast.program.body
let decrypt_code = generate_js(decrypt_list)

// 将解密的相关代码加载到内存中
eval(decrypt_code)
ast = parser.parse(generate_js([execute_body_code]));

// 字符串解密
function referReplace(referencePathList, lastLevelName){
    referencePathList.map(function(p){
        let parentPath = p.parentPath;
        if (t.isCallExpression(parentPath)){
            let code = parentPath.toString();
            let replaceCode = code.replace(lastLevelName, decrypt_func_name);
            parentPath.replaceWith(t.valueToNode(eval(replaceCode)))
            console.log("[1]: 字符串花指令替换: ", code)
        }else if (t.isVariableDeclarator(parentPath)){
            let varName = parentPath.node.id.name;
            let initName = parentPath.node.init.name;
            if (initName === lastLevelName){
                let Binding = parentPath.scope.getBinding(varName);
                if (Binding.referencePaths.length === 0) return;
                referReplace(Binding.referencePaths, varName)
            }
        }else {
            console.log("[referencePath还有其他类型数据需要处理]")
        }
    })
}
traverse(ast, {
    VariableDeclarator(path){
        let varName = path.node.id.name;
        let init = path.node.init;
        if (!init) return;
        let initName = init.name;

        if (!varName || !initName) return;
        if (initName === decrypt_func_name){
            let binding = path.scope.getBinding(varName);
            let referencePaths = binding.referencePaths;
            if (referencePaths.length === 0) return ;
            referReplace(referencePaths, varName);
        }
    }
})

// 函数花指令替换之后, 会生成一些没有引用的变量 和 没有调用的一些对象, 这些都需要删除
for (var i =0; i <=5; i++){
    // 删除一些没有引用的变量
    ast = parser.parse(generator(ast, opts={jsescOption:{"minimal":true}}).code);
    traverse(ast, {
        Identifier(path){
            let name = path.node.name;
            let binding = path.scope.getBinding(name);
            // 没有被引用且没有对这个变量进行修改的地方且父级path不是指定特殊情况, 如此则删除这个垃圾代码
            if (binding && !binding.referenced && binding.constantViolations.length === 0 &&
                !(t.isFunctionExpression(path.parentPath) || t.isCatchClause(path.parentPath) ||
                    t.isFunctionDeclaration(path.parentPath))){
                if (t.isFunctionDeclaration(path.parentPath.node)){
                    debugger;
                }
                console.log("[2]: 删除没有引用过的变量:", path.parentPath.toString());
                path.parentPath.remove();
            }
        }
    })
}

code = generator(ast).code
// new_ast = parser.parse(code);
fs.writeFileSync("E:\\个人\\SpiderCollection\\易盾\\ast_core_min_result.js", code);