'use strict';

describe('Service: reportService', function () {

  // load the service's module
  beforeEach(module('pms3App'));

  // instantiate service
  var reportService;
  beforeEach(inject(function (_reportService_) {
    reportService = _reportService_;
  }));

  it('should do something', function () {
    expect(!!reportService).toBe(true);
  });

});
