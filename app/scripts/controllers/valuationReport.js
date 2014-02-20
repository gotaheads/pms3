'use strict';

angular.module('pms3App')
  .controller('ValuationReportCtrl', ['$scope', 'reportService',
  function ($scope, reportService) {
    //c_code=B&valueationDate=30/06/2013
    //$scope.code = 'BING001';

    reportService.load($scope);


  }]);
