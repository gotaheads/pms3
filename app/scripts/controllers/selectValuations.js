'use strict';

angular.module('pms3App')
  .controller('SelectValuationsCtrl', ['$scope', 'reportService',
  function ($scope, reportService) {
    var $log = $scope.$log;
    $scope.year = reportService.year(),
    $scope.years = reportService.years(),
    $scope.bulk = reportService.batchSize();

    reportService.loadSelection($scope);

    $scope.update = function(val) {
      $log.info('' + $scope.clients +' '+ $scope.bulk + ' val' + val);
      $scope.actions = reportService.loadActions($scope.clients, val);
    };


  }]);
