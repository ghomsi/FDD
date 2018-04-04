'use strict';

/**
 * @ngdoc service
 * @name fouilleDeDonneesProjetsApp.hostservice
 * @description
 * # hostservice
 * Factory in the fouilleDeDonneesProjetsApp.
 */
angular.module('fouilleDeDonneesProjetsApp')
  .factory('hostservice', function () {
    // Service logic
    // ...

    var host = 'http://127.0.0.1:3030'

    // Public API here
    return {
      getHost: function () {
        return host;
      }
    };
  });
