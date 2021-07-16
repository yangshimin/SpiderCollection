var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var signed_params = require('.secsdk.js')

var api = express();
api.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false
}));

api.post('/get_sign_params', function (req, res){
    var params = req.body.params;
    var url = signed_params.get_url_params(params);
    res.send(JSON.stringify(url));
})
