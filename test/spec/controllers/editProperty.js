'use strict';

describe('Controller: EditPropertyCtrl', function () {

  // load the controller's module
  beforeEach(module('pms3App'));

  var EditPropertyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditPropertyCtrl = $controller('EditPropertyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
