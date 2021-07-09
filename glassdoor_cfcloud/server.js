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
    const _cf_chl_opt = JSON.parse(req.body._cf_chl_opt);
    const _cf_chl_ctx = JSON.parse(req.body._cf_chl_ctx);
    const url_params = req.body.url_params;

    fs.writeFileSync('./url_params.txt', url_params);
    fs.writeFileSync('./cf_chl_opt.json', JSON.stringify(_cf_chl_opt));
    fs.writeFileSync('./cf_chl_ctx.json', JSON.stringify(_cf_chl_ctx));
    var sessionStorage = require('./localStorage');
    const {window, navigator, screen, location, String, Image, document, history, Node} = require('./myProxy');
    window["sendRequest"] = function (s) {
        for(var i=1; i <=window._cf_chl_ctx.chC; i++){
            var fp = window._cf_chl_ctx[String(i)].fp;
            if (fp && fp.length === 0){
                window._cf_chl_ctx[String(i)].fp = [
                    {
                        "i": 14,
                        "h": 28
                    },
                    {
                        "i": 25,
                        "h": 14
                    }
                ];
                break
            }
        }
        var data = {
            "url": s,
            "data": window["_cf_chl_ctx"],
        };
        res.send(JSON.stringify(data));
    }

    var execute_js_str = req.body.execute_js_str;
    try{
        eval(execute_js_str)
    }catch (e) {
        console.log(e)
    }
    return

})


var server = api.listen(8090, function (){

})