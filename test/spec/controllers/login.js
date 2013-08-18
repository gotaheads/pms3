'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('pms3App'));

  var LoginCtrl,
      scope = {userProfile:{username:'phillip',password:'phillip'}};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should have username&password authenticated', function () {
  });
});
