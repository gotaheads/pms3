'use strict';

describe('Controller: TopMenuCtrl', function () {

  // load the controller's module
  beforeEach(module('pms3App'));

  var TopMenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopMenuCtrl = $controller('TopMenuCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
