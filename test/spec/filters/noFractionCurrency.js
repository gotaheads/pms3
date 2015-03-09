'use strict';

describe('Filter: noFractionCurrency', function () {

  // load the filter's module
  beforeEach(module('pms3App'));

  // initialize a new instance of the filter before each test
  var noFractionCurrency;
  beforeEach(inject(function ($filter) {
    noFractionCurrency = $filter('noFractionCurrency');
  }));

  it('should return the input prefixed with "noFractionCurrency filter:"', function () {
    var text = 'angularjs';
    expect(noFractionCurrency(text)).toBe('noFractionCurrency filter: ' + text);
  });

});
