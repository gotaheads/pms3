'use strict';

describe('Controller: SelectValuationsCtrl', function () {

  // load the controller's module
  beforeEach(module('pms3App'));

  var SelectValuationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectValuationsCtrl = $controller('SelectValuationsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
