'use strict';

angular.module('pms3App')
  .controller('ValuationReportCtrl', ['$scope', 'reportService',
  function ($scope, reportService) {
    //c_code=B&valueationDate=30/06/2013
    'BING001'

    reportService.load();

  }]);
