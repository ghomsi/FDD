'use strict';

describe('Controller: DialogimportcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('fouilleDeDonneesProjetsApp'));

  var DialogimportcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogimportcontrollerCtrl = $controller('DialogimportcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogimportcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
