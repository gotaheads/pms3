'use strict';

angular.module('pms3App')
  .controller('ValuationReportCtrl',
  function ($scope, $log, reportService) {
    reportService.load($scope);

    $scope.toDate = function(d) {
      return new Date(d);
    }
    function isOdd(num) { return num % 2;}

    $scope.page = function(idx, c, cidx) {
      var count = c.properties.length,
        pages = parseInt(count),
        current = (idx+1)
        ;

//      $log.info('count  ' + count + ' idx ' + idx + isOdd(idx) +
//      ' pages ' + pages);
//      return current + ' of ' + pages;

//      switch(idx) {
//        case 0:
//          return '1 of ' + pages;
//        case 1:
//          return '';
//      }
//
//      if(isOdd(idx)) {
//        return '? of ' + pages;
//      }
    }
    var clientCurrent = 0,
      pageBreak= 'page-break';
    $scope.pageBreak = function(clients, cidx, client, pidx) {
      var count = client.properties.length,
        current = pidx + 1;
//      $log.info('clients  ' + clients + ' idx ' + cidx +
//        ' pidx ' + pidx + ' count ' + count);

      if(current === count) {
        return '';
      }

      return pageBreak;
    }

    $scope.cpageBreak = function(clients, cidx, client, pidx) {
      var count = clients,
        current = cidx + 1;
      $log.info('cpageBreak current  ' + current + ' count ' + count);

      if(current === count) {
        return '';
      }
      return pageBreak;
    }
  });
