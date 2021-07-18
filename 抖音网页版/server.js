var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var api = express();
api.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false
}));

api.post('/get_sign_params', function (req, res){
    var signed_params = require('./secsdk.js')
    var params = JSON.parse(req.body.params);
    var url = signed_params.get_url_params(params);
    res.send(url);
})


var server = api.listen(8090, function (){

})