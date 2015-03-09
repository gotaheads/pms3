'use strict';

describe('Filter: chop', function () {

  // load the filter's module
  beforeEach(module('pms3App'));

  // initialize a new instance of the filter before each test
  var chop;
  beforeEach(inject(function ($filter) {
    chop = $filter('chop');
  }));

  it('should return the input prefixed with "chop filter:"', function () {
    var text = 'angularjs';
    expect(chop(text)).toBe('chop filter: ' + text);
  });

});
