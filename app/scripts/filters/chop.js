'use strict';

angular.module('pms3App')
  .filter('chop', function () {
    return function (value, max, tail, wordwise) {
      if (!value) return '';

      max = parseInt(max);
      if (!max) return value;
      if (value.length <= max) return value;

      value = value.substr(0, max);
      if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace != -1) {
          value = value.substr(0, lastspace);
        }
      }

      return value + (tail || '…');
    };
  });
