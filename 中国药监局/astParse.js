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

const js_code = fs.readFileSync("E:\\个人\\SpiderCollection\\中国药监局\\eval_js.js", {
    encoding: "utf-8"
});

var _$em = []
function _$Ig(_$9o) {
        var _$KV = _$9o.length;
        var _$q5, _$sh = new Array(_$KV - 1), _$uE = _$9o.charCodeAt(0) - 97;
        for (var _$JQ = 0, _$0Z = 1; _$0Z < _$KV; ++_$0Z) {
            _$q5 = _$9o.charCodeAt(_$0Z);
            if (_$q5 >= 40 && _$q5 < 92) {
                _$q5 += _$uE;
                if (_$q5 >= 92) _$q5 = _$q5 - 52;
            } else if (_$q5 >= 97 && _$q5 < 127) {
                _$q5 += _$uE;
                if (_$q5 >= 127) _$q5 = _$q5 - 30;
            }
            _$sh[_$JQ++] = _$q5;
        }
        return String.fromCharCode.apply(null, _$sh);
    }


function _$zM(_$9o) {
        var _$KV = String.fromCharCode(96);
        _$em = _$Ig(_$9o).split(_$KV);
    }

let ast = parser.parse(js_code);



traverse(ast, {
    CallExpression(path){
        let callEe = path.node.callee;
        if (!callEe) return ;
        let callEeName = callEe.name;
        if (callEeName === '_$zM'){
            let argumentsNode = path.node.arguments;
            if (argumentsNode.length === 0 || !t.isStringLiteral(argumentsNode[0])) return;
            let argument = argumentsNode[0].value;
            if (!argument) return;
            eval(path.toString())
        }
    }
})

traverse(ast, {
    MemberExpression(path){
        let memberExpressionNode = path.node.object;
        let memberExpressionName = memberExpressionNode.name;
        if (memberExpressionName && memberExpressionName === '_$em'){
            let property = path.node.property;
            if (t.isNumericLiteral(property)){
                let propertyValue = property.value;
                let realValue = eval("_$em[" + propertyValue + "]");
                path.replaceWith(t.valueToNode(realValue))
            }
        }
    }
})

ast = parser.parse(generator(ast).code);
traverse(ast, {
    CallExpression(path){
        let calleeName = path.node.callee.name;
        if (calleeName === "_$Ig"){
            let argumentsNode = path.node.arguments;
            if (argumentsNode && argumentsNode.length === 1 && t.isStringLiteral(argumentsNode[0])){
                let realValue = eval(path.toString());
                path.replaceWith(t.valueToNode(realValue));
            }
        }
    }
})


code = generator(ast).code
console.log(code)