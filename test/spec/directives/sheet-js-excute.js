'use strict';

describe('Directive: sheetJsExcute', function () {

  // load the directive's module
  beforeEach(module('fouilleDeDonneesProjetsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sheet-js-excute></sheet-js-excute>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sheetJsExcute directive');
  }));
});
