const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}))

const path = require('path')

// db conncet 
 const MongoClient = require('mongodb').MongoClient

const mongoUrl = 'mongodb://admin:admin123@ds257752.mlab.com:57752/multi-tenant-portal';
MongoClient.connect(mongoUrl,{native_parser:true}, (err, client) => {
  if (err) return console.log('-ERROR-',err)
  consol.log('client', client);
  let db = client.db('multi-tenant-portal') 
  app.listen(9000, () => {
    console.log('listening on 9000')
  })
})


//data
var styleConfig = require("./data/style.json");
var elementConfig = require("./data/element.json");
var verbiageConfig = require("./data/verbiage.json");

 app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });

app.get('/', (req, res) =>  res.sendFile(__dirname + '/index.html'))

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

    app.post('/api/post', function(req, res) {
        let data = {
            response: 'You sent: ' + req.body
        };
    
        // Do something, like query a database or save data
        console.log('posted', req.body);
        res.status(200).send(data);
    });

    app.post('/quotes', (req, res) => {
        db.collection('test').save(req.body, (err, result) => {
            if (err) return console.log(err)
        
            console.log('saved to database')
            res.redirect('/')
          })
      })


app.listen(9000, () => console.log('Example app listening on port 9000!'))

