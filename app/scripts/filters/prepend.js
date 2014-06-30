'use strict';

angular.module('pms3App')
  .filter('prepend', function () {
    return function (input) {
      return ((''+input).length === 1?'00':'') + input;
    };
  });
