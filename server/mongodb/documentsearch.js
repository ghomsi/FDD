var schema = require('./schema.js');

exports.getData = function(req,res){

  var type = req.body.type;
  var bd = null;
  if(type==1){
    bd = schema.donneesMix;
  }else{
    bd = schema.donneesText;
  }
  bd.find(function(err,data){
    console.log("----------getData---!!!")
    if(err){
      console.log(err);
      res.send(err);
    }
    console.log('count',data.length);
    res.send(data);
  });
}
