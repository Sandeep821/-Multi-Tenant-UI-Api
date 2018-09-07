const express = require('express')
const app = express()
const path = require('path');

//data
var styleConfig = require("./data/style.json");
var elementConfig = require("./data/style.json");
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
    
    app.get('/api/element-config', (req, res) =>{
        return  res.status(200).json(elementConfig);
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

app.listen(9000, () => console.log('Example app listening on port 9000!'))

