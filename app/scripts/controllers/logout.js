'use strict';

angular.module('pms3App')
  .controller('LogoutCtrl', ['$scope', 'authService',
    function ($scope, authService) {
      var $log = $scope.$log;
      authService.logout();
  }]);
