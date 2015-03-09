'use strict';

describe('Service: valuations', function () {

  // load the service's module
  beforeEach(module('pms3App'));

  // instantiate service
  var valuations;
  beforeEach(inject(function (_valuations_) {
    valuations = _valuations_;
  }));

  it('should do something', function () {
    expect(!!valuations).toBe(true);
  });

});
