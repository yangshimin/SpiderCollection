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

const js_code = fs.readFileSync("E:\\person code\\SpiderCollection\\fedex\\init.js", {
    encoding: "utf-8"
});

var ast = parser.parse(js_code);


function generate_js(astObjList, compact){
    // 初始话一个空的AST对象
    let newAst = parser.parse("");
    // 放入到空的AST对象中 再转为js eval加载到内存中
    astObjList.map(function(p){newAst.program.body.push(p);})
    let code = generator(newAst, {compact: compact}).code;
    return code;
}

// unicode 编码转换
traverse(ast, {
    StringLiteral(path){
        let strExtra = path.node.extra;
        if (!strExtra) return;
        path.replaceWith(type.stringLiteral(strExtra.rawValue));
    }
})

new_ast = parser.parse(generator(ast).code);

let bigArr_seg = new_ast.program.body[0].declarations[0]
let bigArr_name = bigArr_seg.id.name;
eval(generate_js([bigArr_seg]))

traverse(new_ast, {
    MemberExpression(path){
        let object_name = path.node.object.name;
        let propertyValue = path.node.property.value;
        if (!object_name || !propertyValue || object_name !== bigArr_name) return

        console.log("替换: ", path.toString())
        let realValue = eval(path.toString());
        path.replaceWith(type.valueToNode(realValue))

    }
})
// new_ast = parser.parse(generator(new_ast).code);

let code = generator(new_ast, opts = {jsescOption:{"minimal":true}}).code;
fs.writeFileSync("E:\\person code\\SpiderCollection\\fedex\\init_result_v2.js", code);