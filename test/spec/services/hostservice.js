'use strict';

describe('Service: hostservice', function () {

  // load the service's module
  beforeEach(module('fouilleDeDonneesProjetsApp'));

  // instantiate service
  var hostservice;
  beforeEach(inject(function (_hostservice_) {
    hostservice = _hostservice_;
  }));

  it('should do something', function () {
    expect(!!hostservice).toBe(true);
  });

});
