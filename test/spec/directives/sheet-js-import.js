'use strict';

describe('Directive: sheetJsImport', function () {

  // load the directive's module
  beforeEach(module('fouilleDeDonneesProjetsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sheet-js-import></sheet-js-import>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sheetJsImport directive');
  }));
});
