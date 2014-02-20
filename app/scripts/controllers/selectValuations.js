'use strict';

angular.module('pms3App')
  .controller('SelectValuationsCtrl', ['$scope', 'reportService',
    function ($scope, reportService) {
      $scope.year = 2013;
      $scope.clients = 2013;
      $scope.properties = 2013;

  reportService.loadSelection($scope);

  }]);
