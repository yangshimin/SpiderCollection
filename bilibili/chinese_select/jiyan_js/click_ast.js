const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync('F:\\code\\SpiderCollection\\bilibili\\chinese_select\\jiyan_js\\new_click.js', {
    encoding: "utf-8"
});
ast = parser.parse(jscode);


function generate_js(astObjList){
    // 初始话一个空的AST对象
    let newAst = parser.parse("");
    // 放入到空的AST对象中 再转为js eval加载到内存中
    astObjList.map(function(p){newAst.program.body.push(p);})
    let code = generator(newAst, {compact: true}).code;
    return code;
}

let global_dict = {};
let body = ast.program.body[0].expression.callee.body.body;
var newArray = [];

// 将关键js代码dump到内存中 方便后续直接调用
body.map(function(p){
    if ((t.isExpressionStatement(p) && t.isAssignmentExpression(p.expression)) || t.isFunctionDeclaration(p)){
        // 放入到空的AST对象中 再转为js eval加载到内存中
        newArray.push(p);
        // 把AVczv.DFL = function(){...}存在对象中
        if (t.isExpressionStatement(p) && t.isAssignmentExpression(p.expression)){
            let key = p.expression.left.object.name + "." + p.expression.left.property.name;
            let tempArray = [];
            tempArray.push(p);
            global_dict[key] = generate_js(tempArray);
        }
    }
})

let func_property_code = generate_js(newArray);
// 将func_property加载到内存中
eval(func_property_code);

// 字符串解密: 保存所有解密的函数
newArray = [];
traverse(ast, {
    VariableDeclaration(path){
        let declarations = path.node.declarations;
        if (declarations && declarations.length === 3){
            let firstDeclaration = declarations[0];
            let funcOfFirst = firstDeclaration.id.name;
            if (t.isMemberExpression(firstDeclaration.init) &&
                firstDeclaration.init.object.name === "AtULc" &&
                t.isCallExpression(declarations[1].init) &&
                t.isMemberExpression(declarations[1].init.callee) &&
                declarations[1].init.callee.property.name === "concat"){
                newArray.push(firstDeclaration.init);
                let code = generate_js(newArray);
                global_dict[funcOfFirst] = eval(code);
                global_dict[declarations[2].id.name] = eval(code);
                newArray = [];

                // 在添加进数组后删除源代码中定义的语句
                path.remove();
                // 删除下一个shift语句
                var nextPath = path.getNextSibling();
                nextPath.remove();
                // 删除下下一个语句
                var  nnextPath = nextPath.getNextSibling();
                if (!t.isVariableDeclaration(nnextPath)) return;
                var varName = nnextPath.node.declarations[0].id.name;
                var varNameBind = nnextPath.scope.getBinding(varName);
                if (varNameBind && varNameBind.constant && (varNameBind.referencePaths.length === 0) &&
                    (varNameBind.constantViolations.length === 0)){
                    nnextPath.remove();
                }
            }
        }


    }
})

// 字符串解密：替换所有需要解密的地方
traverse(ast, {
    CallExpression(path){
        let objKey = path.node.callee.name;
        let arguments = path.node.arguments;
        // 按理说arguments是个数组 可能有多个参数 这里只处理一个参数的情况
        if (objKey && global_dict.hasOwnProperty(objKey) && arguments.length === 1){
            let value = global_dict[objKey](arguments[0].value);
            if (typeof(value) === "number"){
                path.replaceWith(t.NumericLiteral(value));
            }else if(typeof(value) === "string"){
                path.replaceWith(t.StringLiteral(value));
            }else{
                console.log("存在其他数据类型的结果")
            }
        }
    }
})

ast = parser.parse(generator(ast).code);
// 替换一些函数调用的地方如AVczv.DFL(53)
traverse(ast, {
    CallExpression(path){
        let callFunc = path.node.callee;
        if (!callFunc) return;
        let callObjectName = callFunc.object;
        let callProperty = callFunc.property;
        if (!callObjectName || !callProperty || !((callObjectName.name + "." + callProperty.name) in global_dict)) return;
        if (path.node.arguments && path.node.arguments.length === 1){
            let argumentValue = path.node.arguments[0].value;
            let callObject = callObjectName.name + "." + callProperty.name;
            let realValue = eval(callObject)(argumentValue);
            path.replaceWith(t.valueToNode(realValue));
        }

    }
})

// 提取 for switch 的主要逻辑 其中switch的case都是类似与AtULc.EIh()[3][7]这样
const traverseForSwitch1 = {
    FunctionDeclaration: {
        exit(path){
            function seekFor(control_value, control_operator, stop_value){
                let res_list = [];
                while(eval(control_value + control_operator + stop_value)){
                    for (let caseItem of main_body){
                        if (!t.isMemberExpression(caseItem.test)) return;
                        let realCaseValue = getControlValue(caseItem.test);
                        // 寻找目标的case
                        if (eval(realCaseValue) !== eval(control_value)) continue;

                        let case_body = caseItem.consequent;

                        for (let item of case_body){
                            // if 判断用来定位该语句是不是动态条件赋值的语句(用来改变index的语句)
                            if (t.isExpressionStatement(item) && t.isAssignmentExpression(item.expression) && t.isIdentifier(item.expression.left, {name: control_name})){
                                if (t.isMemberExpression(item.expression.right)){ //直接改变index，例如cW = 0;
                                    control_value = getControlValue(item.expression.right);
                                    continue;
                                }
                            }else if (t.isReturnStatement(item)){
                                res_list.push(item)
                                return res_list
                            }else if (t.isBreakStatement(item)) continue; // 遇到break则不管
                            else {
                                res_list.push(item); //其余代码则放入res_list
                            }
                        }
                    }
                }
                return res_list
            }
            function getRealCall(memberNode){
                let memberObject = memberNode.object;
                if (t.isCallExpression(memberObject)){
                    let callObject = memberObject.callee;
                    if (callObject && t.isMemberExpression(callObject)){
                        let memberStr =  getRealCall(callObject);
                        let propertyValue = memberNode.property.value;
                        return memberStr + "()" + "[" + propertyValue + "]"
                    }
                }
                if (!t.isIdentifier(memberObject)) return;
                return memberObject.name + "." + memberNode.property.name;
            }
            function getControlValue(initObject){
                let object = initObject.object;
                if (t.isMemberExpression(object)){
                    let realMemberStr = getRealCall(object);
                    if (!realMemberStr) return;
                    let lastMemberProperty = initObject.property.value;
                    let control_str =  realMemberStr + "[" + lastMemberProperty + "]"
                    console.log(control_str);
                    return control_str
                }
            }

            let {body} = path.node;
            if (body.body.length !== 2 || !t.isVariableDeclaration(body.body[0]) || !t.isForStatement(body.body[1])) return;
            if (body.body[0].declarations.length !== 1 || !t.isVariableDeclarator(body.body[0].declarations[0])) return;
            let {id, init} = body.body[0].declarations[0];
            let control_name = id.name, control_value = getControlValue(init);

            if (!t.isIdentifier(body.body[1].test.left, {name: control_name}) || !t.isSwitchStatement(body.body[1].body.body[0])) return;
            if (!t.isMemberExpression(body.body[1].test.right)) return;
            let main_body = body.body[1].body.body[0].cases;

            let ans = seekFor(control_value, body.body[1].test.operator, getControlValue(body.body[1].test.right));
            path.node.body.body = ans;
        },
    }
}
traverse(ast, traverseForSwitch1);
let astWithOutSwitch1 = parser.parse(generator(ast).code);

// 提取 for switch 的主要逻辑 其中switch的case都是数字类型
const traverseForSwitch2 = {
    FunctionExpression: {
        exit(path){
            // 判断数组内的元素否符合要求
            function allUpdateExpression(iterable) {
                for (var index = 0; index < iterable.length; index++) {
                    if (!t.isUpdateExpression(iterable[index])) return false;
                }
                return true;
            }
            function seekFor2(control_value, control_operator, stop_value){
                let res_list = [];
                while(control_value + control_operator + stop_value){
                    // 判断要跳转的节点是否在保存的分支节点数组中
                    for (let caseItem of main_body){
                        // 寻找目标的case
                        if (caseItem.test.value !== control_value) continue;
                        let case_body = caseItem.consequent;

                        for (let item of case_body){
                            // if 判断用来定位该语句是不是动态条件赋值的语句(用来改变index的语句)
                            if (t.isExpressionStatement(item) && t.isAssignmentExpression(item.expression) && t.isIdentifier(item.expression.left, {name: control_name})){
                                if (t.isNumericLiteral(item.expression.right)){ //直接改变index，例如cW = 0;
                                    control_value = item.expression.right.value;
                                    continue;
                                }else if (t.isConditionalExpression(item.expression.right)){ //产生while并改变index，例如cW = d0 < cU ? 7 : 3;
                                    let {test, consequent, alternate} = item.expression.right;

                                    // 如果当前三目表达式所属的case条件值已经保存中branchNodeArray中 则跳出闭环
                                    if (branchNodeArray.includes(control_value)){
                                        return res_list;
                                    }
                                    branchNodeArray.push(caseItem.test.value);
                                    // 如果在某个case条件下存在三目表达式 则递归寻找闭环
                                    let body_block = t.blockStatement(seekFor2(consequent.value, control_operator, stop_value));
                                    res_list.push(t.whileStatement(test, body_block));
                                    control_value = alternate.value;
                                    continue;
                                }
                            }else if (t.isReturnStatement(item)){
                                res_list.push(item)
                                return res_list
                            }else if (t.isBreakStatement(item)) continue; // 遇到break则不管
                            else {
                                res_list.push(item); //其余代码则放入res_list
                            }
                        }
                    }
                }
                return res_list
            }

            let {body} = path.node;
            if (body.body.length !== 2 || !t.isVariableDeclaration(body.body[0]) || !t.isForStatement(body.body[1])) return;
            if (body.body[0].declarations.length !== 1 || !t.isVariableDeclarator(body.body[0].declarations[0])) return;
            let {id, init} = body.body[0].declarations[0];
            let control_name = id.name, control_value = init.value;

            if (!t.isIdentifier(body.body[1].test.left, {name: control_name}) || !t.isSwitchStatement(body.body[1].body.body[0])) return;
            let main_body = body.body[1].body.body[0].cases;

            // 这里定义一个数组 用来保存有三目表达式这样的分支节点的case条件
            var branchNodeArray = [];
            let ans = seekFor2(control_value, body.body[1].test.operator, body.body[1].test.right.value, []);
            path.node.body.body = ans;
        },
    }
}
traverse(astWithOutSwitch1, traverseForSwitch2);

// unicode 编码转换
let newAst = parser.parse(generator(astWithOutSwitch1).code);
traverse(newAst, {
    StringLiteral(path){
        let strExtra = path.node.extra;
        if (!strExtra) return;
        path.replaceWith(t.stringLiteral(strExtra.rawValue));
    }
})

// opts = {jsescOption:{"minimal":true}} 解决中文unicode替换没有生效的情况
var js_code = generator(newAst, opts = {jsescOption:{"minimal":true}}).code;
fs.writeFileSync("F:\\code\\SpiderCollection\\bilibili\\chinese_select\\jiyan_js\\new_click_ast_result.js", js_code);