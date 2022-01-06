var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var convert = require('./ast_watchman').convert
var sleep = require('sleep');

var api = express();

api.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false
}));

api.post('/convert_watch_man', function (req, res){
    let envCode = fs.readFileSync("env.js", {
        encoding: "utf-8"
    });
    let getAcTokenJs = fs.readFileSync("get_ac_token.js", {
        encoding: "utf-8"
    })

    let watch_file_path = req.body.watch_man_js;
    let config_info = JSON.parse(req.body.js_config_info);
    let product_number = req.body.productNumber;
    let bid = req.body.bid;
    let convert_watch_man_code = convert(watch_file_path);
    let watchManExecuteCode = envCode + "\n" + convert_watch_man_code + "\n" + getAcTokenJs;
    fs.writeFileSync("watchManExecute.js", watchManExecuteCode, {
        encoding: "utf-8"
    });

    eval(watchManExecuteCode)
    get_ac_token(config_info, product_number, bid)

    setTimeout(function(){
        let ac_token = eval('window["acToken"]');
        res.send(ac_token);
    }, 3000);

})

api.get('/get_fp', function(req, res){
    let envCode = fs.readFileSync("env.js", {
        encoding: "utf-8"
    });
    let fp_code = fs.readFileSync("get_fingerprint.js", {
        encoding: "utf-8"
    })
    let executeCode = envCode + "\n" + fp_code;
    let fingerPrint = eval(executeCode);
    res.send(fingerPrint);
})


var server = api.listen(8090, function (){

})