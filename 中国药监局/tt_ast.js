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

const js_code = fs.readFileSync("E:\\个人\\SpiderCollection\\中国药监局\\tt.js", {
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

function deepCopy (obj, cache = []) {

    function find (list, f) {
        return list.filter(f)[0]
    }

    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}

// 函数花指令
var functionMap = Object()
traverse(ast, {
    FunctionDeclaration(path){
        let functionName = path.node.id.name;
        if (!functionName) return ;
        let functionBodyList = path.node.body.body;
        if (functionBodyList.length === 1 && t.isReturnStatement(functionBodyList[0])){
            functionMap[functionName] = functionBodyList[0].argument;
        }
    }
})

traverse(ast, {
    CallExpression(path){
        let calleeName = path.node.callee.name;
        if (!calleeName) return;
        let callArguments = path.node.arguments;
        let mapValue = functionMap[calleeName];
        if (mapValue){
            if (t.isBinaryExpression(mapValue)){
                var temp = deepCopy(mapValue);
                temp.left.arguments = [callArguments[0]]
                temp.right = callArguments[1]
                path.replaceWith(temp)
            }else if (t.isNumericLiteral(mapValue)){
                path.replaceWith(mapValue)
            }else{
                debugger;
                console.log("出现未预料到的函数花指令")
            }
        }
    }
})


let code = generator(ast).code;
console.log(code)