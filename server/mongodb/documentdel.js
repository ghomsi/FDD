var schema = require('./schema.js');



//POST
exports.delCollectionData = function(req, res){
  var bd= null;
  if(req.body.type==1){
    bd =  schema.donneesMix;
  }else{
    bd =  schema.donneesText;
  }
  bd.remove(function(err){
    if(err){
      console.log(err);
    }else{
      res.send("done");
    }
  });
}
