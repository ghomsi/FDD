'use strict';

describe('Controller: ResultatnumCtrl', function () {

  // load the controller's module
  beforeEach(module('fouilleDeDonneesProjetsApp'));

  var ResultatnumCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResultatnumCtrl = $controller('ResultatnumCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResultatnumCtrl.awesomeThings.length).toBe(3);
  });
});
