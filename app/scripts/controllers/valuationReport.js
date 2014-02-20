'use strict';

angular.module('pms3App')
  .controller('ValuationReportCtrl', ['$scope', 'reportService',
  function ($scope, reportService) {
    reportService.load($scope);

  }]);
