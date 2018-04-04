'use strict';

describe('Controller: ResultatCtrl', function () {

  // load the controller's module
  beforeEach(module('fouilleDeDonneesProjetsApp'));

  var ResultatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResultatCtrl = $controller('ResultatCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResultatCtrl.awesomeThings.length).toBe(3);
  });
});
