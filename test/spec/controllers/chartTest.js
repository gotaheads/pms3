'use strict';

describe('Controller: ChartTestCtrl', function () {

  // load the controller's module
  beforeEach(module('pms3App'));

  var ChartTestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartTestCtrl = $controller('ChartTestCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
