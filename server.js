const express = require('express')
const bodyParser = require('body-parser')
const imageProcessor = require('./imageProcessor.js');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('outputImage'));

app.get('/', function (req, res) {
  res.send('nodejs ecertificate generator')
})

app.get('/generateCertificate', function (req, res) {
    let { user_name, date , course , tmpl_id , response} = req.query;
    let props = { user_name, date , course };
    
    imageProcessor.generateImage(props, tmpl_id ,function(imageUrl){
        
        if(response === "view")
            res.send("<img src='"+imageUrl.replace("./outputImage","")+"' />");
        else  
            res.sendFile(imageUrl , { root: __dirname });  
        
    })
    
})

app.listen(5000);