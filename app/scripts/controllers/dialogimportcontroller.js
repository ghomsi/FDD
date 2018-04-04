'use strict';

/**
 * @ngdoc function
 * @name fouilleDeDonneesProjetsApp.controller:DialogimportcontrollerCtrl
 * @description
 * # DialogimportcontrollerCtrl
 * Controller of the fouilleDeDonneesProjetsApp
 */
angular.module('fouilleDeDonneesProjetsApp')
  .controller('DialogimportcontrollerCtrl', function ($scope,$mdDialog) {

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

  });
