'use strict';

angular.module('pms3App')
  .controller('ValuationReportCtrl',
  function ($scope, $log, reportService) {
    reportService.load($scope);

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
      pageBreak= 'page-break', noBreak = 'hide';
    $scope.pageBreak = function(clients, cidx, client, pidx) {
      var count = client.properties.length,
        current = pidx + 1;
     // $log.info('pageBreak clients: ' + clients + ' cidx: ' + cidx +
     //   ' pidx: ' + pidx + ' client.properties: ' + count +
     //   ' pidx === 0: ' + (pidx === 0?'no break':'') +
     //   ' current ('+current+') === count ('+count+'): '+ (current === count?'no break':'') +
     //   ' isOdd(pidx): ' + (isOdd(pidx)?'no break':'break'));

      if(pidx === 0) {
        return noBreak;
      }

      if(current === count) {
        return noBreak;
      }

      if(!isOdd(pidx)) {
        return noBreak;
      }

      return pageBreak;
    }

    $scope.cpageBreak = function(clients, cidx, client, pidx) {
      var count = clients,
        current = cidx + 1;
      // $log.info('cpageBreak current: ' + current + ' count: ' + count +
      //   ' count === 1: ' + (count === 1?'no break':'') +
      //   ' current ('+current+') === count ('+count+'): '+ (current === count?'no break':'') +
      //   '');

      if(count === 1) {
        return noBreak;
      }

      if(current === count) {
        return noBreak;
      }
      return pageBreak;
    }

    $scope.size = function(img) {
      return 'height:150px;';
    }

  });
