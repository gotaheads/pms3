'use strict';

describe('Service: rests', function () {

  // load the service's module
  beforeEach(module('pms3App'));

  // instantiate service
  var rests;
  beforeEach(inject(function (_rests_) {
    rests = _rests_;
  }));

  it('should do something', function () {
    expect(!!rests).toBe(true);
  });

});
