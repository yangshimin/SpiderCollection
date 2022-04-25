var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var fedex = require('./t').fedex_sensor_data;

var api = express();
var fedex_ins = new fedex();

api.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false
}));

api.post('/cookie', function (req, res){
    let envCode = fs.readFileSync("env.js", {
        encoding: "utf-8"
    });
    let zeroCode = fs.readFileSync("0.js", {
        encoding: "utf-8"
    });
    let oneCode = fs.readFileSync("1.js", {
        encoding: "utf-8"
    });
    let twoCode = fs.readFileSync("2.js", {
        encoding: "utf-8"
    });
    let cookie = req.body.cookie;
    let cookie_str = "document.cookie = " + "'" + cookie + "'"
    let js_code = envCode + "\n" + cookie_str + ";\n" + req.body.code + "\n" +
        zeroCode + "\n" + oneCode + "\n" + twoCode + "\n"

    fs.writeFileSync("execute.js", js_code, {
        encoding: "utf-8"
    });

    eval(js_code)
    setTimeout(function(){
        var gmpCookie = eval("document.cookie")
        console.log(gmpCookie)
        res.send(gmpCookie);
    }, 2000);




})


var server = api.listen(8090, function (){

})