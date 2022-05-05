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

const js_code = fs.readFileSync("F:\\code\\SpiderCollection\\amazon\\metadata1.js", {
    encoding: "utf-8"
});
let ast = parser.parse(js_code);

// 删除垃圾代码
traverse(ast, {
    VariableDeclarator(path){
        let name = path.node.id.name;
        let bind = path.scope.getBinding(name);
        if (bind && !bind.referenced && bind.constantViolations.length === 0){
            console.log("删除无用的变量:", path.parentPath.toString());
            path.remove();

        }
    }
})

traverse(ast, {
    VariableDeclarator(path){
        let name = path.node.id.name;
        let init = path.node.init;
        if (!init || !t.isArrayExpression(init)) return;
        if (init.elements.length === 0) return;
        let bind = path.scope.getBinding(name);
        if (!bind) return;
        if (bind && bind.referencePaths.length > 0){
            bind.referencePaths.map(function(p){
                let parentPath = p.parentPath;
                if (t.isMemberExpression(parentPath)){
                    let objectName = parentPath.node.object.name;
                    if (objectName === name){
                        let propertyValue = parentPath.node.property.value
                        if(t.isStringLiteral(init.elements[propertyValue])){
                            path.parentPath.replaceWith(t.valueToNode(init.elements[propertyValue].value));
                        }else if(t.isNullLiteral(init.elements[propertyValue])){
                            path.parentPath.replaceWith(t.valueToNode(null));
                        }else if(t.isNumericLiteral(init.elements[propertyValue])){
                            path.parentPath.replaceWith(t.valueToNode(init.elements[propertyValue].value));
                        }
                    }
                }
            })
        }

    }
})

new_ast = parser.parse(generator(ast).code);
code = generator(new_ast, opts = {jsescOption:{"minimal":true}}).code;
console.log(code)
