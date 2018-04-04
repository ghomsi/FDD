var schema = require('./schema.js');

exports.countattributeVal = function(req,res){

  var attr = req.body.attrName;
  var val = req.body.val;
  console.log("attr",attr);
  console.log("val",val);
  var search={};
  if(attr=="outlook") search={"outlook":val};
  if(attr=="temp") search={"temp":val};
  if(attr=="humidity") search={"humidity":val};
  if(attr=="windy") search={"windy":(val==false)};//(val=="FALSE")?0:1
  if(attr=="play") search={"play":val};
  schema.donneesText.find(search)
  .count().exec(function(err,count){
    if(err){
      console.log(err);
      res.send(err);
    }
    console.log('count',count);
    res.send(''+count);
  });
}

exports.countallattributeVal = function(req,res){
  var bd = "donneesBayestext";
  schema.donneesText.find().count().exec(function(err,count){
    if(err){
        console.log(err);
        res.send(err);
    }
    console.log('count',count);
    res.send(''+count);
  });
}

exports.countattributeValCondi = function(req,res){

  console.log("elem",req.body);

  var attr = req.body.attrName;
  var val = req.body.val;
  var condition= req.body.condition;
  var type = req.body.type;

  var search=[];
  if(attr=="outlook") search.push({"outlook":val});
  if(attr=="temp") search.push({"temp":val});
  if(attr=="humidity") search.push({"humidity":val});
  if(attr=="windy") search.push({"windy":(val==1)});//(val=="FALSE")?0:1
  //if(attr=="play") search.push({"play":val});

  //condition
  search.push({"play":condition});

  schema.donneesText.find({$and:search})
  .count().exec(function(err,count){
    if(err){
      console.log(err);
      res.send(err);
    }
    console.log('count',count);
    res.send(''+count);
  });
}

exports.countallattributeValCondi = function(req,res){
  var bd = "donneesBayestext";
  var condition= req.body.condition;

  schema.donneesText.find({"play":condition}).count().exec(function(err,count){
    if(err){
        console.log(err);
        res.send(err);
    }
    console.log('count',count);
    res.send(''+count);
  });
}

exports.statzigma = function(req,res){

  console.log("elem",req.body);

  var attr = req.body.attrName;
  var val = req.body.val;
  var condition= req.body.condition;
  var type = req.body.type;

  var search=[];
  if(attr=="outlook") search.push([
     { $group: { _id: "$play", stdDev: { $stdDevPop: "$outlook" } } }
  ]);
  if(attr=="temp") search.push([
     { $group: { _id: "$play", stdDev: { $stdDevPop: "$temp" } } }
  ]);
  if(attr=="humidity") search.push([
     { $group: { _id: "$play", stdDev: { $stdDevPop: "$humidity" } } }
  ]);
  if(attr=="windy") search.push([
     { $group: { _id: "$play", stdDev: { $stdDevPop: "$windy" } } }
  ]);//(val=="FALSE")?0:1
  //if(attr=="play") search.push({"play":val});

  schema.donneesMix.aggregate(search).exec(function(err,zigma){
    if(err){
      console.log(err);
      res.send(err);
    }
    console.log('zigma',zigma);
    res.send(zigma);
  });
}

exports.statmu = function(req,res){

  console.log("elem",req.body);

  var attr = req.body.attrName;
  var val = req.body.val;
  var condition= req.body.condition;
  var type = req.body.type;

  var search=[];
  if(attr=="outlook") search.push([
     { $group: { _id: "$play", avg: { $avg: "$outlook" } } }
  ]);
  if(attr=="temp") search.push([
     { $group: { _id: "$play", avg: { $avg: "$temp" } } }
  ]);
  if(attr=="humidity") search.push([
     { $group: { _id: "$play", avg: { $avg: "$humidity" } } }
  ]);
  if(attr=="windy") search.push([
     { $group: { _id: "$play", avg: { $avg: "$windy" } } }
  ]);//(val=="FALSE")?0:1
  //if(attr=="play") search.push({"play":val});

  schema.donneesMix.aggregate(search).exec(function(err,mu){
    if(err){
      console.log(err);
      res.send(err);
    }
    console.log('mu',mu);
    res.send(mu);
  });
}
