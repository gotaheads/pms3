'use strict';

describe('Controller: TownSuburbsCtrl', function () {

  // load the controller's module
  beforeEach(module('pms3App'));

  var TownSuburbsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TownSuburbsCtrl = $controller('TownSuburbsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
