var express = require('express');
var http = require('http');
var add = require('./mongodb/documentadd.js');
var stat = require('./mongodb/statistic.js');
var del = require('./mongodb/documentdel.js');
var search = require('./mongodb/documentsearch.js');

var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//app.use(express.static('../images'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.post('/api/addcollectiondata',urlencodedParser,add.addCollectionData)
   .post('/api/getbddata',urlencodedParser,search.getData)
   .post('/api/statzigma',urlencodedParser,stat.statzigma)
   .post('/api/statmu',urlencodedParser,stat.statmu)
   .post('/api/countattributeVal',urlencodedParser,stat.countattributeVal)
   .post('/api/countallattributeVal',urlencodedParser,stat.countallattributeVal)
   .post('/api/countattributeValcondi',urlencodedParser,stat.countattributeValCondi)
   .post('/api/countallattributeValcondi',urlencodedParser,stat.countallattributeValCondi)
   .post('/api/deletecollection',urlencodedParser,del.delCollectionData);


var httpServer = http.createServer(app);

httpServer.listen(3030,'127.0.0.1',function(){
console.log("http Listening 3030")
});
