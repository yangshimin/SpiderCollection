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
    var sdk_setting_info = req.body.sdk_setting_info;
    var web_id_info = req.body.web_id_info;
    var render_data = req.body.render_data
    var url = signed_params.get_url_params(web_id_info, sdk_setting_info, render_data);
    res.send(url);
})


var server = api.listen(8090, function (){

})