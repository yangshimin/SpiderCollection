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

const js_code = fs.readFileSync("F:\\code\\SpiderCollection\\中国海关进出口\\防debugger.js", {
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

// 大数组倒序
var big_array = ast.program.body[0];
var pop_func = ast.program.body[1].expression.expressions.pop()
var reverse_func = ast.program.body[1];
var decrypt_func = ast.program.body[2];
var decrypt_name = decrypt_func.id.name;

var decrypt_code = generate_js([big_array, reverse_func, decrypt_func])
eval(decrypt_code);

var new_ast = parser.parse(generate_js([pop_func, ast.program.body[3], ast.program.body[4], ast.program.body[5]]))


function referenceConvert(path, decryptName){
    let init = path.node.init;
    let identifier = path.node.id;
    if (!init || !identifier) return ;

    let initName = init.name;
    let identifierName = identifier.name;

    // if (identifierName === "_0x1ae254"){
    //     debugger
    // }

    if (initName !== decryptName) return;
    let bindings = path.scope.getBinding(identifierName);
    if (bindings.referencePaths.length > 0){
        bindings.referencePaths.map(function(p){
            let parentPath = p.parentPath;
            if (type.isCallExpression(parentPath)){
                let realValue = eval(parentPath.toString().replace(identifierName, decrypt_name));
                parentPath.replaceWith(type.valueToNode(realValue));
            }else if(type.isVariableDeclarator(parentPath)){
                referenceConvert(parentPath, identifierName);
            }else{
                debugger
            }
        })
    }
}

// 字符串解密
traverse(new_ast, {
    VariableDeclarator(path){
        referenceConvert(path, decrypt_name)
    }
})
new_ast = parser.parse(generator(new_ast).code);

// 删除一些未引用到的对象
for (var i=0; i<=3; i++){
    traverse(new_ast, {
        VariableDeclarator(path){
            let idName = path.node.id.name;

            let binding = path.scope.getBinding(idName);
            if (binding.referencePaths.length === 0){
                path.remove()
            }
        }
    })
    new_ast = parser.parse(generator(new_ast).code);
}

// 生成totalObj对象
var totalObj = {};
traverse(new_ast, {
    VariableDeclarator(path){
        let id = path.node.id;
        let init = path.node.init;
        if (!id || !init) return;

        let idName = id.name;
        if (type.isObjectExpression(init) && init.properties.length === 0){
            let bindings = path.scope.getBinding(idName);
            if (bindings.referencePaths.length > 0){
                if (!totalObj[idName]) totalObj[idName] = {};
                bindings.referencePaths.map(function(p){
                    let parentPath = p.parentPath;

                    if (type.isVariableDeclarator(parentPath) && parentPath.node.init.name === idName) {
                        let keyName = parentPath.node.id.name;
                        totalObj[keyName] = totalObj[idName]
                    }else{
                        let propertyName = parentPath.node.property.value;
                        let objectName = parentPath.node.object.name;

                        let parentParentPath = parentPath.parentPath;
                        if (!parentParentPath.node.right) return;
                        // 如果right 还是MemberExpression 则继续找
                        if (type.isMemberExpression(parentParentPath.node.right)){
                            let objName = parentParentPath.node.right.object.name;
                            let propertyName = parentParentPath.node.right.property.value;
                            if (totalObj[objName] && totalObj[objName][propertyName]){
                                totalObj[objectName][propertyName] = totalObj[objName][propertyName];
                            }else{
                                debugger
                            }
                        }else{
                            totalObj[objectName][propertyName] = parentParentPath.node.right;
                            parentParentPath.remove();
                        }
                    }
                })
            }
        }
    }
})
new_ast = parser.parse(generator(new_ast).code);

// 在生成totalObj对象后根据key把相关的代码删除掉
let totalObjKeys = Object.keys(totalObj)
for (var i=0; i<=totalObjKeys.length; i++){
    let keyName = totalObjKeys[i];
    traverse(new_ast, {
        VariableDeclarator(path){
            let idName = path.node.id.name;
            if (idName === keyName){
                let binding = path.scope.getBinding(idName);
                if (binding.referencePaths.length !== 0){
                    path.remove()
                    binding.referencePaths.map(function (nodePath) {
                        let parentPath = nodePath.parentPath;
                        if (parentPath.type === "VariableDeclarator"){
                            console.log(parentPath.toString());
                            parentPath.remove()
                        }else{
                            console.log(parentPath.parentPath.toString());
                            parentPath.parentPath.remove();
                        }
                    })
                }
            }
        }
    })
    new_ast = parser.parse(generator(new_ast).code);
}

new_ast = parser.parse(generator(new_ast).code);

function replaceCode(path, template_obj, arguments){
    if (type.isFunctionExpression(template_obj)){
        let templateFuncBody = template_obj.body.body[0];
        let realFuncBody = templateFuncBody.argument;

        if (type.isBinaryExpression(realFuncBody)){  // return 语句的body是二项式的情况
            let newBinaryExpression = type.BinaryExpression(realFuncBody.operator, arguments[0], arguments[1])
            path.replaceWith(newBinaryExpression)
        }else if(type.isCallExpression(realFuncBody)){  // return 语句的body是一个函数调用的情况
            let templateObjArgument = template_obj.params;

            if (realFuncBody.callee.object && realFuncBody.callee.property){
                let callEePropertyValue = realFuncBody.callee.property.value;
                let callEeObjectName = realFuncBody.callee.object.name;
                let template_objs = totalObj[callEeObjectName]

                if (template_objs && template_objs[callEePropertyValue]){
                    replaceCode(path, template_objs[callEePropertyValue], arguments)
                }
            }else if(realFuncBody.callee.name === templateObjArgument[0].name){
                let newCallExpression = type.CallExpression(arguments[0], arguments.slice(1))
                path.replaceWith(newCallExpression);
            }else{
                debugger
            }

        }else{
            debugger
        }
    }else{
        debugger
    }
}

// 花指令解密
traverse(new_ast, {
    CallExpression(path){   // 函数花指令解密
        let callee = path.node.callee;
        let arguments = path.node.arguments;

        if (!callee || !callee.object) return;
        let objectName = callee.object.name;
        let propertyValue = callee.property.value;

        if (!objectName || !propertyValue) return;
        let template_objs = totalObj[objectName];
        if (!template_objs) return;

        let template_obj = template_objs[propertyValue];
        if (!template_obj) return;
        replaceCode(path, template_obj, arguments)
    },
    MemberExpression(path){   // 字符串花指令解密
        let objectName = path.node.object.name;
        let propertyValue = path.node.property.value;

        if (!objectName || !propertyValue) return;
        let templateObjs = totalObj[objectName];
        if (!templateObjs) return;

        let templateObj = templateObjs[propertyValue];
        if (!templateObj) return;

        if (type.isStringLiteral(templateObj)){
            path.replaceWith(templateObj);
        }else{
            debugger
        }

    }
})

new_ast = parser.parse(generator(new_ast).code);

code = generator(new_ast).code
fs.writeFileSync("F:\\code\\SpiderCollection\\中国海关进出口\\result_v1.js", code);
