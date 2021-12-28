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

const js_code = fs.readFileSync("E:\\个人\\SpiderCollection\\易盾\\t.js", {
    encoding: "utf-8"
});
const env_code = fs.readFileSync("E:\\个人\\SpiderCollection\\易盾\\tt.js", {encoding: "utf-8"})
eval(env_code)

let ast = parser.parse(js_code);

traverse(ast, {
    MemberExpression(path){
        let objectName = path.node.object.name;
        let propertyValue = path.node.property.value;
        if (!objectName || propertyValue === undefined) return;
        try {
            eval(objectName)
            let realValue = eval(objectName + "[" + propertyValue + "]")
            path.replaceWith(t.valueToNode(realValue))
        }catch (e){}
    }
})



code = generator(ast).code
fs.writeFileSync("E:\\个人\\SpiderCollection\\易盾\\ast_tt_result.js", code);