'use strict';

describe('Service: propertyService', function () {

  // load the service's module
  beforeEach(module('pms3App'));

  // instantiate service
  var propertyService;
  beforeEach(inject(function (_propertyService_) {
    propertyService = _propertyService_;
  }));

  it('should do something', function () {
    expect(!!propertyService).toBe(true);
  });

});
