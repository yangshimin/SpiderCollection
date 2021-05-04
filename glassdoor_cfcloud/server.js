var express = require('express');
var bodyParser = require('body-parser');
var first_decode = require('./first_decode')
var fs = require('fs');

var api = express();

function sleep(n) {
    var start = new Date().getTime();
    //  console.log('休眠前：' + start);
    while (true) {
        if (new Date().getTime() - start > n) {
            break;
        }
    }
};

api.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false
}));

api.post('/first_decode', function (req, res){
    var cRay = req.body.cRay;
    var decrypt_data = req.body.decrypt_data;
    var js_code = first_decode.decode(cRay, decrypt_data);
    res.send(js_code);
})

api.post('/answer_js', function (req, res){
    const fs = require('fs');
    const atob = require('atob');
    var canvas = require('canvas');
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var LocalStorage = require('node-localstorage').LocalStorage;
    sessionStorage = require("sessionstorage");
    localStorage = new LocalStorage('./scratch');
    const jsdom = require("jsdom");
    const {JSDOM} = jsdom;

    var execute_js_str = req.body.execute_js_str;
    if (execute_js_str.includes('history.replaceState')){
        console.log("history.replaceState");
    };
    try{
        eval(execute_js_str)
    }catch (e) {
        console.log(e)
    }

    // sleep(20000)
    // var filePath = "F:\\code\\glassdoor_js\\result.txt"
    // var json_data = fs.readFileSync(filePath, "utf-8");
    // var data = JSON.parse(json_data);
    // fs.unlinkSync(filePath);
    // res.send(data);

})


var server = api.listen(8090, function (){

})