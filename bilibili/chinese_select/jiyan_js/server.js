var express = require('express');
var sdk = require("./fullpage_test.js");
var click_sdk = require("./click_test")
var bodyParser = require('body-parser');

var api = express();

api.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false
}));

api.get('/get_token', function(req, res){
    var token = sdk.get_token()
    res.send(token)
})

api.post('/get_init_w', function (req, res){
    var gt = req.body.gt;
    var challenge = req.body.challenge;
    var file_config = req.body.config;
    var w = sdk.init_w(gt, challenge, file_config);
    res.send(w);
})

api.post("/get_check_w", function (req, res) {
    var gt = req.body.gt;
    var challenge = req.body.challenge;
    var file_config = req.body.config;
    var s = req.body.s;
    var tracks = JSON.parse(req.body.tracks);
    var w = sdk.get_check_w(gt, challenge, file_config, s, tracks);
    res.send(w);
})

api.post("/get_click", function (req, res){
    var gt = req.body.gt;
    var challenge = req.body.challenge;
    var call_infos = JSON.parse(req.body.call_infos);
    var tracks = JSON.parse(req.body.tracks);
    var points = JSON.parse(req.body.points);
    var w = click_sdk.click_w(gt, challenge, call_infos, tracks, points)
    res.send(w);
})

var server = api.listen(8090, function (){

})