'use strict';

/**
 * @ngdoc overview
 * @name fouilleDeDonneesProjetsApp
 * @description
 * # fouilleDeDonneesProjetsApp
 *
 * Main module of the application.
 */
angular
  .module('fouilleDeDonneesProjetsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/resultat', {
        templateUrl: 'views/resultat.html',
        controller: 'ResultatCtrl',
        controllerAs: 'resultat'
      })
      .when('/resultatnum', {
        templateUrl: 'views/resultatnum.html',
        controller: 'ResultatnumCtrl',
        controllerAs: 'resultatnum'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
