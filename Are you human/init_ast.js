var fs = require('fs');
// 解析js,将js代码转换为AST
// parser的parse方法有第二个参数sourceType, 当js代码中含有import、export (es6的代码)等关键字时
// 需要指定sourceType为module
var parser = require("@babel/parser");
// 用来遍历AST中的节点
var traverse = require("@babel/traverse").default;
// 用来判断节点类型和生成新的节点等
var type = require("@babel/types");
// 用来把AST代码转换成JS代码
// generator 也有其他参数，具体参考文档: https://babeljs.io/docs/en/@babel-generator
var generator = require("@babel/generator").default;

const js_code = fs.readFileSync("E:\\个人\\SpiderCollection\\Are you human\\init.js", {
    encoding: "utf-8"
});

window = global;
var ast = parser.parse(js_code);


function generate_js(astObjList, compact){
    // 初始话一个空的AST对象
    let newAst = parser.parse("");
    // 放入到空的AST对象中 再转为js eval加载到内存中
    astObjList.map(function(p){newAst.program.body.push(p);})
    let code = generator(newAst, {compact: compact}).code;
    return code;
}

var atob = function (param) {
    return new Buffer(param, 'base64').toString();
}
window.atob = atob;
var decrypt_code_z = function(n){
    return window.atob(n);
}
var decrypt_code_e = function(e){
    for (var i = atob(e), a = "mfVEnjy", c = "", u = 0; u < i.length; ++u) {
        var d = a.charCodeAt(u % 7);
        c += String.fromCharCode(d ^ i.charCodeAt(u))
    }
    return c;
}

traverse(ast, {
    VariableDeclaration(path){
        let VariableDeclarator = path.node.declarations[0];
        let var_id = VariableDeclarator.id;
        let var_init = VariableDeclarator.init;
        if (!var_id || !var_init) return;
        if (var_init.name === 'e'){
            let bindings = path.scope.getBinding(var_id.name);
            if (bindings.referencePaths.length > 0){
                bindings.referencePaths.map(function (p) {
                    let parentNode = p.parentPath.node;
                    if (type.isCallExpression(parentNode)){
                        let arguments = parentNode.arguments[0].value;
                        if (arguments === "PT5ndF5eTg"){
                            debugger
                        }
                        if (arguments !== undefined){
                            let real_value = decrypt_code_e(arguments)
                            p.parentPath.replaceWith(type.valueToNode(real_value));
                        }
                    }
                })
            }
        }
    }
})

new_ast = parser.parse(generator(ast).code);
traverse(new_ast, {
    CallExpression(path){
        let callee = path.node.callee;
        let arguments = path.node.arguments;
        if (!callee || !arguments) return;
        if (callee.name && callee.name === "z"){
            let argu = arguments[0].value;
            if (argu !== undefined){
                let realValue = decrypt_code_z(argu);
                path.replaceWith(type.valueToNode(realValue));
            }
        }else if(callee.name && callee.name === "e"){
            try{
                let argu = arguments[0].value;
                if (argu !== undefined){
                    let realValue = decrypt_code_e(argu);
                    path.replaceWith(type.valueToNode(realValue));
                }
            }catch (e){
                debugger
            }

        }
    }
})


new_ast = parser.parse(generator(new_ast).code);

code = generator(new_ast).code
fs.writeFileSync("E:\\个人\\SpiderCollection\\Are you human\\init_ast_result.js", code);
