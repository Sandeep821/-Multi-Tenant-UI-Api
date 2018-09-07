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
    
    app.get('/api/style-config/:tenantId', (req, res) =>{
        var tenantId = req.params.tenantId;
        styleData = [{ 
            "tenantName": "audiUsa",
            "tenantId": "001",
            "msg": "msg from Data API for Style config",
            "site": {
              "name": "audiUsa",
              "style": {
                "logo" : {
                  "direction":"left"
                },
                "nav" : {
                  "direction":"right"
                }
              }
            }
          },
          { 
            "tenantName": "bugattiUsa",
            "tenantId": "002",
            "msg": "msg from Data API for Style config",
            "site": {
              "name": "bugatti",
              "style": {
                "logo" : {
                  "direction":"right"
                },
                "nav" : {
                  "direction":"left"
                }
              }
            }
          }
          ];
        let styleDataResult;
         styleData.forEach(function(data) {
            if(data.tenantId === tenantId) {
                styleDataResult = data;
            }
        });
        
        return  res.status(200).json(styleDataResult);
    });
    
    app.get('/api/element-config', (req, res) =>{
        return  res.status(200).json(elementConfig);
    });
    
    app.get('/api/verbiage-config', (req, res) =>{
        return  res.status(200).json(verbiageConfig);
    });

app.listen(9000, () => console.log('Example app listening on port 9000!'))

