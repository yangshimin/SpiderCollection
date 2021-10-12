var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var api = express();

api.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false
}));

api.post('/cookie', function (req, res){
    let envCode = fs.readFileSync("env.js", {
        encoding: "utf-8"
    });
    let cookie = req.body.cookie;
    let cookie_str = "document.cookie = " + "'" + cookie + "'"
    let js_code = envCode + "\n" + cookie_str + ";\n" + req.body.code;

    eval(js_code)
    setTimeout(function(){
        var gmpCookie = eval("document.cookie")
        console.log(gmpCookie)
        res.send(gmpCookie);
    }, 10000);



})


var server = api.listen(8090, function (){

})