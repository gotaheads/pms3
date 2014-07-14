'use strict';

angular.module('pms3App')
  .controller('SelectValuationsCtrl', ['$scope', '$routeParams', 'reportService',
  function ($scope, $routeParams, reportService) {
    var $log = $scope.$log,
      year = ($routeParams.year);
    $scope.year = year,
    $scope.years = reportService.years(),
    $scope.bulk = reportService.batchSize();

    reportService.loadSelection($scope);

    $scope.update = function(val) {
      $log.info('' + $scope.clients +' '+ $scope.bulk + ' val' + val);
      $scope.actions = reportService.loadActions($scope.clients, val);
    };


  }]);
