var schema = require('./schema.js');


//POST
exports.addCollectionData = function(req, res){
  //var sanitized = JSON.parse(stringify(req.body));

  console.log("on node server addCollectionUser: "+req.body.data);
  //console.log("---------add-----:"+req.body.length);
  var data =[];
  var json = JSON.parse(req.body.data);
  json.forEach(function(item) {
    console.log("---------add-----:");
    //if(item.cni!=null) item.montant = parseInt(item.montant,10);
    //if(item.cni!=null) item.cni = parseInt(item.cni,10);
    //if(item.cni!=null) item.compteNo = parseInt(item.compteNo,10);
    //if(item.cni!=null) item.tel = parseInt(item.tel,10);
    // Create user in memory
    var donnees= null;
    if(req.body.type==1){
      donnees = new schema.donneesMix(item);
    }else{
      donnees = new schema.donneesText(item);
    }


    // Save it to database
    donnees.save(function(err){
      if(err){
        console.log(err);
        data.push(err);
      }else{
        console.log(JSON.stringify(donnees));
        data.push(donnees);
      }
    });
  });
  res.send(data);

};
