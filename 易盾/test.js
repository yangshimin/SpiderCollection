Sa = /./;


console.log("准备执行Sa.toString操作")
try {
    Sa.toString = function () {
        console.log("执行了Sa.toString操作");
        return Sa.wc = !0;
    }, console.log("%c", Sa);
} catch (td) {console.log("error td: ", td)}

console.log(Sa.wc)