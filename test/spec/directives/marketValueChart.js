'use strict';

describe('Directive: marketValueChart', function () {
  beforeEach(module('pms3App'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<market-value-chart></market-value-chart>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the marketValueChart directive');
  }));
});
