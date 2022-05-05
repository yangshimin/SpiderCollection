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

api.post('/init', function(req, res){
    let cookie = req.body.cookie;
    fedex_ins.init(cookie)
    res.send({"status": "Success"})
})

api.get('/first_get_sensor_data', function(req, res){
    let sensor_data = fedex_ins.first_get_sensor_data();
    res.send(sensor_data);
})

api.post('/second_get_sensor_data', function(req, res){
    fedex_ins.set_cookie_abck(req.body.cookie)
    let sensor_data = fedex_ins.second_get_sensor_data();
    res.send(sensor_data);
})

api.post('/third_get_sensor_data', function(req, res){
    fedex_ins.set_cookie_abck(req.body.cookie)
    let sensor_data = fedex_ins.third_get_sensor_data();
    res.send(sensor_data);
})

api.post('/fourth_get_sensor_data', function(req, res){
    fedex_ins.set_cookie_abck(req.body.cookie)
    let sensor_data = fedex_ins.fourth_get_senor_data();
    res.send(sensor_data);
})



var server = api.listen(8090, function (){

})