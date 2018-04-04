'use strict';

/**
 * @ngdoc directive
 * @name fouilleDeDonneesProjetsApp.directive:sheetJsImport
 * @description
 * # sheetJsImport
 */
angular.module('fouilleDeDonneesProjetsApp')
  .directive('sheetJsImport', function ($rootScope,$mdDialog,$mdToast,serviceAjax) {
    return {
      //scope: { },
      restrict: 'AE',//E = element, A= Attribute, C = Class, M = Comment
      link: function postLink(scope,element, attrs) {

        element.on('change', function (changeEvent) {

          var confirm = $mdDialog.confirm()
          .title('Données numériques?')
          .textContent('Si les attributs "Temperature" et "Humidity" sont evalués numériquement alors cliquez sur oui')
          .ariaLabel('data type')
          .targetEvent(changeEvent)
          .ok('Oui')
          .cancel('Non');

          $mdDialog.show(confirm).then(function() {
            var reader = new FileReader();

            reader.onload = function (e) { //alert('son');
              /* read workbook */
              var bstr = e.target.result;
              var workbook = XLSX.read(bstr, {type:'binary'});
              var worksheet = workbook.Sheets[workbook.SheetNames[0]];

              /* bookType can be any supported output type */
              //var wopts = { bookType:'xlsx', bookSST:false, type:'array' };

              //var wbout = XLSX.write(workbook,wopts);
              $rootScope.excellHTML = XLSX.utils.sheet_to_html(worksheet);
              var json = XLSX.utils.sheet_to_json(worksheet);
              //console.log('json1:'+JSON.stringify(json));



              $rootScope.busy=true;
              serviceAjax.addCollectionData({data:JSON.stringify(json),type: 1})
                .done(function(res){
                  console.log(res.length);
                  $mdToast.show(
                    $mdToast.simple()
                      .textContent('Fichier ajouté à la base de donnée: ')
                      .position('top right')
                      .hideDelay(3000)
                  );
                  $rootScope.busy=false;

                })
                .fail(function(err){
                  console.log(err);
                  $mdToast.show(
                    $mdToast.simple()
                      .textContent('Error:Fichier non ajouté à la base de donnée')
                      .position('top right')
                      .hideDelay(3000)
                  );
                  $rootScope.busy=false;
                });
                $mdDialog.hide();



            }
            reader.readAsBinaryString(changeEvent.target.files[0]);
           //End import
          }, function() {
            var reader = new FileReader();

            reader.onload = function (e) { //alert('son');
              /* read workbook */
              var bstr = e.target.result;
              var workbook = XLSX.read(bstr, {type:'binary'});
              var worksheet = workbook.Sheets[workbook.SheetNames[0]];

              /* bookType can be any supported output type */
              //var wopts = { bookType:'xlsx', bookSST:false, type:'array' };

              //var wbout = XLSX.write(workbook,wopts);
              $rootScope.excellHTML = XLSX.utils.sheet_to_html(worksheet);
              var json = XLSX.utils.sheet_to_json(worksheet);
              //console.log('json1:'+JSON.stringify(json));



              $rootScope.busy=true;
              serviceAjax.addCollectionData({data:JSON.stringify(json),type: 0})
                .done(function(res){
                  console.log(res.length);
                  $mdToast.show(
                    $mdToast.simple()
                      .textContent('Fichier ajouté à la base de donnée: ')
                      .position('top right')
                      .hideDelay(3000)
                  );
                  $rootScope.busy=false;

                })
                .fail(function(err){
                  console.log(err);
                  $mdToast.show(
                    $mdToast.simple()
                      .textContent('Error:Fichier non ajouté à la base de donnée')
                      .position('top right')
                      .hideDelay(3000)
                  );
                  $rootScope.busy=false;
                });
                $mdDialog.hide();

            }
            reader.readAsBinaryString(changeEvent.target.files[0]);
           //End import
          });




        });


      }
    };
  });
