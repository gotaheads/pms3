'use strict';

angular.module('pms3App')
  .controller('ValuationReportCtrl', ['$scope', 'reportService',
  function ($scope, reportService) {
    reportService.load($scope);
    $scope.toDate = function(d) {
      return new Date(d);
    }
    $scope.pageBreak = function(idx) {

    }
  }]);
