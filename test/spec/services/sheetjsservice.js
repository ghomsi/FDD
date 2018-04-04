'use strict';

describe('Service: SheetJSService', function () {

  // load the service's module
  beforeEach(module('fouilleDeDonneesProjetsApp'));

  // instantiate service
  var SheetJSService;
  beforeEach(inject(function (_SheetJSService_) {
    SheetJSService = _SheetJSService_;
  }));

  it('should do something', function () {
    expect(!!SheetJSService).toBe(true);
  });

});
