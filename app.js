const express = require('express')
const app = express()
const path = require('path');

//data
var styleConfig = require("./data/style.json");
var elementConfig = require("./data/style.json");
var verbiageConfig = require("./data/style.json");

app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });

app.get('/', (req, res) => res.send('DEMO API!'))

app.get('/api/test', (req, res) =>{
    res.send({ 'express': 'Hello from data API' })
    });
    
    app.get('/api/style-config', (req, res) =>{
        return  res.status(200).json(styleConfig);
    });
    
    app.get('/api/element-config', (req, res) =>{
        return  res.status(200).json(elementConfig);
    });
    
    app.get('/api/verbiage-config', (req, res) =>{
        return  res.status(200).json(verbiageConfig);
    });

app.listen(9000, () => console.log('Example app listening on port 9000!'))

