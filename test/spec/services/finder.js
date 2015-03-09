'use strict';

describe('Service: finder', function () {

  // load the service's module
  beforeEach(module('pms3App'));

  // instantiate service
  var finder;
  beforeEach(inject(function (_finder_) {
    finder = _finder_;
  }));

  it('should do something', function () {
    expect(!!finder).toBe(true);
  });

});
