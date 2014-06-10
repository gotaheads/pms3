'use strict';

angular.module('pms3App')
  .filter('range', function () {
    return function(arr, start, end) {
      return (arr || []).slice(start, end);
    };
//    return function (input) {
//      return 'range filter: ' + input;
//    };
  });
