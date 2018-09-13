const express = require('express')
const app = express()
const path = require('path');


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//data
var styleConfig = require("./data/style.json");
var elementConfig = require("./data/element.json");
var verbiageConfig = require("./data/verbiage.json");

 app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });

app.get('/', (req, res) => res.send('DEMO API!'))

   app.get('/api/test', (req, res) =>{
    res.send({ 'express': 'Hello from data API' })
    });

    app.get('/api/style-config/:tenantId', (req, res) =>{
        var tenantId = req.params.tenantId;
        let styleDataResult;
        styleConfig.forEach(function(data) {
            if(data.tenantId === tenantId) {
                styleDataResult = data;
            }
        });
        return  res.status(200).json(styleDataResult);
    });
    
    app.get('/api/element-config/:tenantId', (req, res) =>{ 
        var tenantId = req.params.tenantId;
        let elementConfigResult;
        elementConfig.forEach(function(data) {
            if(data.tenantId === tenantId) {
                elementConfigResult = data;
            }
        });
        return  res.status(200).json(elementConfigResult);
    });
    
    app.get('/api/verbiage-config/:tenantId', (req, res) =>{
        var tenantId = req.params.tenantId;
        let  verbiageDataResult;
        verbiageConfig.forEach(function(data) {
            if(data.tenantId === tenantId) {
                verbiageDataResult = data;
            }
        });
        return  res.status(200).json(verbiageDataResult);
    });


    app.post('/api/users', function(req, res) {
        var user_id = req.body.id;
        var token = req.body.token;
        var geo = req.body.geo;
    
        res.status(200).send(req.body)
        console.log('posted');
    });

    app.post('/api/post', function(req, res) {
        let data = {
            response: 'You sent: ' + req.body
        };
    
        // Do something, like query a database or save data
        console.log('posted', req.body);
        res.status(200).send(data);
    });


app.listen(9000, () => console.log('Example app listening on port 9000!'))

