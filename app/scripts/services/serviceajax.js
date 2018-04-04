'use strict';

/**
 * @ngdoc service
 * @name fouilleDeDonneesProjetsApp.serviceAjax
 * @description
 * # serviceAjax
 * Factory in the fouilleDeDonneesProjetsApp.
 */
angular.module('fouilleDeDonneesProjetsApp')
  .factory('serviceAjax', function ($mdToast,$q,hostservice) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    var countAttributeVal= function(data){
      return $.post(hostservice.getHost()+'/api/countattributeVal',data);
    };
    var countAllAttributeVal= function(data){
      return $.post(hostservice.getHost()+'/api/countallattributeVal',data);
    };
    //
    var countAttributeValCondi= function(data){//attrName,val,condition
      return $.post(hostservice.getHost()+'/api/countattributeValcondi',data);
    };
    var countAllAttributeValCondi= function(data){//attrName,condition
      return $.post(hostservice.getHost()+'/api/countallattributeValcondi',data);
    };
    var mu= function(data){
      var mu=$.post(hostservice.getHost()+'/api/statmu',data)
      .then(function(res){
        console.log("mu",res);
        //count1=parseInt(res,10);
        var mu =0;
        if(data.condition==res[0]._id){
          mu=res[0].avg;
        }else{
          mu=res[1].avg;
        }
        //console.log("mu",mu);
        return mu;
      })
      .catch(function(err){
        console.log(err);
      });
      return mu;
    };

    var zigma= function(data){
      var zigma=$.post(hostservice.getHost()+'/api/statzigma',data)
      .then(function(res){
        console.log("zigma",res);
        //console.log("data-----",data);
        var zigma =0;
        if(data.condition==res[0]._id){
          zigma=res[0].stdDev;
        }else{
          zigma=res[1].stdDev;
        }
        //count1=parseInt(res,10);
        //console.log("zigma",zigma);
        return zigma;
      })
      .catch(function(err){
        console.log(err);
      });
      return zigma;
    };


    var densite= function(data){

      return $q.all([zigma(data),mu(data)]).then(stat => {

        console.log("stat-----",stat);

        var zigma = stat[0]*1;
        var mu = stat[1]*1;
        //console.log('zigma densite',zigma);
        //console.log('mu densite',mu);
        var densite = (1/Math.sqrt(2*Math.PI*zigma))*Math.exp(-Math.pow((data.val-mu),2)/(2*Math.pow(zigma,2)));
        console.log("densite",densite);
        return densite;
      });
      //console.log("densite",densite);
      //return densite;
    };





    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      f: function(data){
        return densite(data)
                .then(function(res){
                  console.log("f(x)=",res);
                  return res;
                })
                .catch(function(err){
                  console.log(err);
                });

      },
      Pr: function(data){
        //if(data.type==1){ // 1= attribute numérique
        //    return this.densite(attrName,val,condition);
        //}else{
          var count1=0;
          var count2=0;

          var val= countAttributeVal(data)
          .then(function(res){
            console.log("count1",res);
            count1=res;
            return countAllAttributeVal(data);
          })
          .then(function(res){
            console.log("count2",res);
            count2=parseInt(res,10);
            console.log(JSON.stringify(data)+": count1="+count1+" count2="+count2);
            if(count2==0){
              var type = (data.type==0)?"Text":"Numérique";
              $mdToast.show(
                $mdToast.simple()
                  .textContent('BD '+type+' vide! ')
                  .position('top right')
                  .hideDelay(6000)
              );
            }else{

                var val = count1/count2;
                console.log("count1/count2",val);
                return val;


            }
          })
          .catch(function(err){
            console.log(err);
          })

          return val;
        //}// end else

      },
      PrCond: function(data){
        //if(data.type==1){ // 1= attribute numérique
        //    return this.densite(attrName,val,condition);
        //}else{

            var count1=0;
            var count2=0;
            var k=0;

            var val= countAttributeValCondi(data)
            .then(function(res){
              console.log("count1",res);
              count1=parseInt(res.val,10);
              k=parseInt(res.k,10);
              return countAllAttributeValCondi(data);
            })
            .then(function(res){
              console.log("count2",res);
              count2=parseInt(res,10);
              console.log(JSON.stringify(data)+": count1="+count1+" count2="+count2);
              if(count2==0){
                var type = (data.type==0)?"Text":"Numérique";
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('BD '+type+' vide! ')
                    .position('top right')
                    .hideDelay(6000)
                );
              }else{
                if(k==1){
                  var val = count1/(count2+k);
                  console.log("count1/count2 k="+k,val);
                  return val;

                }else{
                  var val = count1/count2;
                  console.log("count1/count2",val);
                  return val;
                }
                //console.log("count1/count2",count1/count2);
                return val;
              }
            })
            .catch(function(err){
              console.log(err);
            })

            return val;
        //}// end else
      },
      decision: function(Pr1,Pr2){
        if(Pr1>Pr2) return true;
        return false;
      },
      addCollectionData: function(data){
        //console.log('data:'+JSON.stringify(data[0]));
        return $.post(hostservice.getHost()+'/api/addcollectiondata',data);
      },
      delCollectionData: function(data){
        //console.log('data:'+JSON.stringify(data[0]));
        return $.post(hostservice.getHost()+'/api/deletecollection',data);
      },
      getBDData: function(data){
        //console.log('data:'+JSON.stringify(data[0]));
        return $.post(hostservice.getHost()+'/api/getbddata',data);
      },

    };
  });
