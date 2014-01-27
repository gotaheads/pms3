'use strict';

angular.module('pms3App')
  .directive('selectOnClick', function () {
    return function (scope, element, attrs) {
      element.bind('click', function () {
        this.select();

        this.setSelectionRange(0, 9999);
      });
      element.bind('mouseup', function (e) {
        e.preventDefault();
      });


    };
  });
