'use strict';

/**
 * @ngdoc function
 * @name fouilleDeDonneesProjetsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fouilleDeDonneesProjetsApp
 */
angular.module('fouilleDeDonneesProjetsApp')
  .controller('MainCtrl', function ($scope,$rootScope,$location,$q,$mdToast,$mdDialog,serviceAjax,SheetJSService) {

    $rootScope.methode={};
    $rootScope.json=[];
    $rootScope.methode.radio="";
    $rootScope.meth1=false;
    $rootScope.meth2=false;
    $rootScope.busy=false;

    //$rootScope.disabledexec=true;

    this.excellModele = function(){
      var data = [
      {
        outlook: 'sunny',
        temp: 'hot',
        humidity: 'high',
        windy: false,
        play: true
      }];
      $rootScope.busy=true;
      SheetJSService.xlsx(data);
      $rootScope.busy=false;
    }

    this.showImport = function(ev) {
     $location.path('/');
     $mdDialog.show({
       controller: DialogImportController,
       templateUrl: 'views/dialogviews/dialog.importdata.html',
       parent: angular.element(document.body),
       targetEvent: ev,
       clickOutsideToClose:true,
       fullscreen: false // Only for -xs, -sm breakpoints.
     })
     .then(function(answer) {
       //$scope.status = 'You said the information was "' + answer + '".';
     }, function() {
       //$scope.status = 'You cancelled the dialog.';
     });
   };

   function DialogImportController($scope,$rootScope,$route,$q,$mdToast,$mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

    this.bayesAction = function(name, ev) {
      $rootScope.meth1=true;
      $rootScope.meth2=false;

      /*$mdDialog.show($mdDialog.alert()
        .title(name)
        .textContent('You triggered the "' + name + '" action')
        .ok('Great')
        .targetEvent(ev)
      );*/
    };
    this.abdAction = function(name, ev) {
      $rootScope.meth1=false;
      $rootScope.meth2=true;
      $mdDialog.show($mdDialog.alert()
        .title(name)
        .textContent('En construction!')
        .ok('OK')
        .targetEvent(ev)
      );
    };

    this.sampleAction = function(name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)
        .textContent('You triggered the "' + name + '" action')
        .ok('Great')
        .targetEvent(ev)
      );
    };

    this.executer = function(ev){
      $rootScope.busy=true;
      if($rootScope.meth1){

            $mdDialog.show({
              controller: DialogExecuterController,
              templateUrl: 'views/dialogviews/dialog.executerdata.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: false // Only for -xs, -sm breakpoints.
              })
              .then(function() {

              }, function() {

              });


            function DialogExecuterController($scope,$route,$rootScope,$mdDialog) {
                 $scope.hide = function() {
                   $mdDialog.hide();
                 };

                 $scope.cancel = function() {
                   $mdDialog.cancel();
                 };

                 $scope.numBD = function() {
                    $location.path('/resultatnum');
                    $route.reload();
                 };

                 $scope.textBD = function() {
                   $location.path('/resultat');
                   $route.reload();
                 };
              }// END dialog controllers


      }else if($rootScope.meth2){
          alert("ABD en construction, veillez choisir la méthode bayes!")
          //alert(serviceAjax.Pr("outlook","hot"));
      }else{
        $mdToast.show(
          $mdToast.simple()
            .textContent('veillez selectionner une methode! ')
            .position('top right')
            .hideDelay(6000)
        );
      }
      $rootScope.busy=false;
    }

    this.showBD = function(ev){
      $location.path('/');
      $scope.items=null;
      $scope.excellHTML="";

      var confirm = $mdDialog.confirm()
        .title('Base de Données Numériques?')
        .textContent('souhaitez vous afficher le contenu la base de données numériques? Oui= BD au valeur "Numérique" ; Non= BD au valeur "Text" ; ESC= annuler')
        .ariaLabel('show data base')
        .targetEvent(ev)
        .clickOutsideToClose(true)
        .ok('Oui')
        .cancel('Non');

      $mdDialog.show(confirm).then(function() {
        serviceAjax.getBDData({type:1})
        .done(function(res){
          $scope.methode.radio="BD numérique";
          $scope.items=res;
          $scope.$apply();
          $mdToast.show(
            $mdToast.simple()
              .textContent('Recherche effectuée! ')
              .position('top right')
              .hideDelay(6000)
          );
        })
        .fail(function(err){
          console.log(err);
          $scope.items=[];
          $scope.$apply();
        });
      }, function() {
        serviceAjax.getBDData({type:0})
        .done(function(res){
          $scope.methode.radio="BD texte";
          $scope.items=res;
          $scope.$apply();
          $mdToast.show(
            $mdToast.simple()
              .textContent('Recherche effectuée! ')
              .position('top right')
              .hideDelay(6000)
          );
        })
        .fail(function(err){
          console.log(err);
          $scope.items=[];
          $scope.$apply();
        })
      });
    }

    this.delCollection = function(ev){
      $location.path('/');
      var confirm = $mdDialog.confirm()
        .title('Vider Données Numériques?')
        .textContent('souhaiter vous supprimer la base de données numériques? Oui= BD au valeur "Numérique" ; Non= BD au valeur "Text" ; ESC= annuler')
        .ariaLabel('clear data base')
        .targetEvent(ev)
        .clickOutsideToClose(true)
        .ok('Oui')
        .cancel('Non');

      $mdDialog.show(confirm).then(function() {
        serviceAjax.delCollectionData({type:1})
        .done(function(res){
          $scope.items=[];
          $scope.$apply();
          $mdToast.show(
            $mdToast.simple()
              .textContent('BD numérique VIDE! ')
              .position('top right')
              .hideDelay(6000)
          );
        })
        .fail(function(err){
          console.log(err);
        });
      }, function() {
        serviceAjax.delCollectionData({type:0})
        .done(function(res){
          $scope.items=[];
          $scope.$apply();
          $mdToast.show(
            $mdToast.simple()
              .textContent('BD text VIDE! ')
              .position('top right')
              .hideDelay(6000)
          );
        })
        .fail(function(err){
          console.log(err);
        })
      });
    }

  });
