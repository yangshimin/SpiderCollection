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


function generate_js(astObjList){
    // 初始话一个空的AST对象
    let newAst = parser.parse("");
    // 放入到空的AST对象中 再转为js eval加载到内存中
    astObjList.map(function(p){newAst.program.body.push(p);})
    let code = generator(newAst, {compact: true}).code;
    return code;
}

function convert(watchManJs){
    // const js_code = fs.readFileSync(watchManJs, {
    //     encoding: "utf-8"
    // });

    let ast = parser.parse(watchManJs);

    // 把多个自执行函数嵌套摊平
    traverse(ast, {
        ExpressionStatement(path){
            let expression = path.node.expression;
            if (!expression) return;
            if (type.isCallExpression(expression)){
                let callEe = expression.callee;
                let callEeArguments = expression.arguments;
                // callEe为函数并且调用的时候参数为空 这里手动指定了替换的次数(需要自行判断，如果不这么做 碰见同名的变量或函数会出问题)
                if (type.isFunctionExpression(callEe) && Array.isArray(callEeArguments) && this.opt.index <=2){
                    // console.log("[1]提取自执行函数body")
                    path.replaceWithMultiple(callEe.body.body);
                    this.opt.index++;
                }
            }
        }
    }, opt={"index":0})

    let code = generator(ast).code;
    let new_ast = parser.parse(watchManJs);
    let decrypt_body = ast.program.body.slice(0, 2);
    let decrypt_code = generate_js(decrypt_body);
    eval(decrypt_code)
    new_ast = parser.parse(generate_js(ast.program.body.slice(2, ast.program.body.length)))

    // 字符串解密
    traverse(new_ast, {
        VariableDeclaration(path){
            if (path.parent.type !== "Program") return;
            path.node.declarations.map(function (node){
                let identifierName = node.id.name;
                let init = node.init;
                if (!init) return;
                let elementsValue = node.init.elements;
                if (!elementsValue) return;
                let elementsRealValue = [];
                elementsValue.map(function (ele){
                    let ele_js_code = generate_js([ele])
                    let realValue = eval(ele_js_code);
                    elementsRealValue.push(realValue);
                })
                let Bindings = path.scope.getBinding(identifierName);
                if (Bindings && Bindings.referenced){
                    Bindings.referencePaths.map(function(nodePath){
                        let parenPath = nodePath.parentPath;
                        let propertyValue = parenPath.node.property.value;
                        parenPath.replaceWith(type.valueToNode(elementsRealValue[propertyValue]))
                        // console.log("[2]字符串解密")
                    })
                }
            })
        }
    })

    // 替换掉要检测环境的"Buffer" 和 "nodejs" 字符串
    new_ast = parser.parse(generate_js(new_ast.program.body.slice(2, new_ast.program.body.length)))
    traverse(new_ast, {
        StringLiteral(path){
            let strValue = path.node.value;
            if (strValue === "Buffer" || strValue === "nodejs"){
                path.remove();
                // console.log("[3]删除检测项: ", strValue)
            }
        }
    })

    // 替换掉createOscillator的步骤中调用不存在的方法的语句: k["reduction"] && (k["reduction"]["value"] = -20);
    new_ast = parser.parse(generator(new_ast).code);
    traverse(new_ast, {
        ExpressionStatement(path){
            let expression = path.node.expression;
            if (!type.isLogicalExpression(expression)) return;
            let leftValue = expression.left;
            if (!leftValue || !type.isMemberExpression(leftValue)) return;
            if (type.isStringLiteral(leftValue.property) && leftValue.property.value === "reduction"){
                path.remove();
            }
        }
    })

    // 用固定的值替换createOscillator的计算结果
    new_ast = parser.parse(generator(new_ast).code);
    traverse(new_ast, {
        MemberExpression(path){
            let property = path.node.property;
            if (!property) return;
            if (property.value === "renderedBuffer"){
                let parentPath = path.parentPath;
                while (parentPath.type !== 'VariableDeclaration'){
                    parentPath = parentPath.parentPath;
                }
                let declarations = parentPath.node.declarations;
                if (!declarations) return;
                let identifierName = declarations[0].id;
                let newVar = type.variableDeclarator(identifierName, type.stringLiteral("902f0fe98719b779ea37f27528dfb0aa"));
                // parentPath.replaceWith(newVar)
                parentPath.insertAfter(newVar);
            }
        }
    })

    // 注入代码
    new_ast = parser.parse(generator(new_ast).code);
    traverse(new_ast, {
        ExpressionStatement(path){
            if (path.container.length < 5) return;
            // 获取临近的几个节点
            let expressionValue = path.node.expression.value;
            let nextPath = path.getSibling(path.key + 1);
            let nextNextPath = path.getSibling(path.key + 2);

            // 判断临近的这几个节点的值都是""
            if (type.isExpressionStatement(nextPath) && type.isExpressionStatement(nextNextPath)){
                let nextPathValue = nextPath.node.expression.value;
                let nextNextValue = nextNextPath.node.expression.value;
                if (expressionValue === "" && nextPathValue === "" && nextNextValue === ""){
                    // 获取父节点的父节点
                    let parentPath = path.parentPath.parentPath;
                    // 判断js代码中是否有indexOf
                    if (!type.isIfStatement(parentPath)) return;
                    let ifTestCase = parentPath.node.test;
                    let ifTestCaseCode = generate_js([ifTestCase]);
                    if (ifTestCaseCode.indexOf("indexOf") === -1) return;

                    // 定位到要进行替换的语句
                    let previousPath = path.getSibling(path.key - 2);
                    let expression = previousPath.node.expression;
                    if (type.isAssignmentExpression(expression)){
                        let left = expression.left;
                        let right = expression.right;
                        if (!type.isIdentifier(left)) return;
                        let leftValue = left.name;
                        let rightValue = generate_js([right])
                        let templateCode = `var lastD = "";
            try{
                lastD = fs.readFileSync("d$a.js", {
                    encoding: "utf-8"
                })
            }catch (e){}
            if (lastD){
                ${leftValue} = JSON.parse(lastD);
                fs.writeFileSync("d$a.js", JSON.stringify(${rightValue}), {
                    encoding: "utf-8"
                });
            }else{
                ${leftValue} = ${rightValue};
                fs.writeFileSync("d$a.js", JSON.stringify(${leftValue}), {
                    encoding: "utf-8"
                });
            }`
                        let replaceAst = parser.parse(templateCode);
                        previousPath.replaceWithMultiple(replaceAst.program.body);
                    }

                }
            }
        }
    })

    code = generator(new_ast).code
    // fs.writeFileSync("E:\\个人\\SpiderCollection\\易盾\\ast_watchman_result_v3.js", code);
    return code
}


// const js_code = fs.readFileSync('static\\watchMan.js', {
//     encoding: "utf-8"
// });
// convert(js_code)
module.exports = {
    convert
}