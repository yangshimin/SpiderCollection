const fs = require('fs');
// 解析js,将js代码转换为AST
// parser的parse方法有第二个参数sourceType, 当js代码中含有import、export (es6的代码)等关键字时
// 需要指定sourceType为module
const parser = require("@babel/parser");
// 用来遍历AST中的节点
const traverse = require("@babel/traverse").default;
// 用来判断节点类型和生成新的节点等
const type = require("@babel/types");
// 用来把AST代码转换成JS代码
// generator 也有其他参数，具体参考文档: https://babeljs.io/docs/en/@babel-generator
const generator = require("@babel/generator").default;

const js_code = fs.readFileSync("E:\\个人\\SpiderCollection\\易盾\\static\\watch_man.js", {
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

let decrypt_body = ast.program.body.slice(0, 4);
let decrypt_code = generate_js(decrypt_body);
// let new_ast = parser.parse(generate_js([ast.program.body[ast.program.body.length - 1]]));
let new_ast = parser.parse(fs.readFileSync("E:\\个人\\SpiderCollection\\易盾\\static\\watch_man_test.js", {
    encoding: "utf-8"
}))
eval(decrypt_code)

traverse(new_ast, {
    MemberExpression: {
        exit(path){
            if (!path.node.computed) return;
            let objectName = path.node.object.name;
            let property = path.node.property;
            if (!property) return;
            let propertyValue = property.value;

            if (!objectName || propertyValue === undefined) return;
            let code = path.toString();
            try{
                // console.log(code);
                if (code === 'h["type"]'){
                    debugger
                }
                let realValue = eval(code);
                path.replaceWith(type.valueToNode(realValue));
            }catch (e){}
        }
    }
})


code = generator(new_ast).code
console.log(code)
// fs.writeFileSync("E:\\个人\\SpiderCollection\\易盾\\ast_watchman_result.js", code);