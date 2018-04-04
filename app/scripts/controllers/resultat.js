'use strict';

/**
 * @ngdoc function
 * @name fouilleDeDonneesProjetsApp.controller:ResultatCtrl
 * @description
 * # ResultatCtrl
 * Controller of the fouilleDeDonneesProjetsApp
 */
angular.module('fouilleDeDonneesProjetsApp')
  .controller('ResultatCtrl', function ($scope,$rootScope,$q,$mdDialog,$location,serviceAjax) {


    console.log(JSON.stringify($rootScope.json));
    var result=[]
    //$scope.items=[];
    $rootScope.busy=true;
    $rootScope.json.forEach(function(elem){
      console.log(elem);
      var calculate=[];
      var prYes =[];
      var prNo = [];
      var i=1;
      if(elem.outlook!=null){
          ++i;
          var data1={attrName:"outlook",val:elem.outlook,condition:true,type:0};
          prYes.push(serviceAjax.PrCond(data1));
          var data6={attrName:"outlook",val:elem.outlook,condition:false,type:0};
          prNo.push(serviceAjax.PrCond(data6));
      }

      if(elem.temp!=null){
          ++i;
          var data2={attrName:"temp",val:elem.temp,condition:true,type:0};
          prYes.push(serviceAjax.PrCond(data2));
          var data7={attrName:"temp",val:elem.temp,condition:false,type:0};
          prNo.push(serviceAjax.PrCond(data7))
      }

      if(elem.humidity!=null){
        ++i;
        var data3={attrName:"humidity",val:elem.humidity,condition:true,type:0};
        prYes.push(serviceAjax.PrCond(data3));
        var data8={attrName:"humidity",val:elem.humidity,condition:false,type:0};
        prNo.push(serviceAjax.PrCond(data8));
      }

      if(elem.windy!=null){

        ++i;
          var data4={attrName:"windy",val:elem.windy,condition:true,type:0};
          prYes.push(serviceAjax.PrCond(data4));
          var data9={attrName:"windy",val:elem.windy,condition:false,type:0};
          prNo.push(serviceAjax.PrCond(data9));
      }

      var data5={attrName:"play",val:"yes",type:0};
      prYes.push(serviceAjax.Pr(data5));
      var data10={attrName:"play",val:"no",type:0};
      prNo.push(serviceAjax.Pr(data10));

      calculate= prYes;
      prNo.forEach(function(p){
        calculate.push(p);
      });
      $q.all(calculate).then(data => {
        console.log('Both promises have resolved i='+i, data);
        var PrYes=1;
        var PrNo=1;
        var j=i;
        for(var k=0;k<i;k++,j++){
          PrYes*=data[k];
          PrNo*=data[j];

        }
        //var PrYes=data[0]*data[1]*data[2]*data[3]*data[4];
        //var PrNo=data[5]*data[6]*data[7]*data[8]*data[9];
        if(i<5){
          var a = (PrYes/(PrYes+PrNo)); //ici PrYes = likelihood
          var b = (PrNo/(PrYes+PrNo)); //ici PrNo = likelihood
          elem.play= serviceAjax.decision(a,b);
          elem.prYes=a;
          elem.prNo=b;
        }else{
          elem.play= serviceAjax.decision(PrYes,PrNo);
          elem.prYes=PrYes;
          elem.prNo=PrNo;
        }
        result.push(elem);

        //alert(PrYes+"/"+PrNo);
      });
    });
    console.log("decision",result);
    $scope.items=result;
    $rootScope.busy=false;
    $mdDialog.cancel();
  });
