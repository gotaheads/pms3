'use strict';

angular.module('pms3App')
  .directive('resize', function () {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, elem, attrs) {

        elem.on('load', function() {
          var w = elem.width,
              h = elem.height;

          if(w > h) {
            elem.css('width', '190px');
          }else {
            elem.css('height', '150px');
          }


          //  var div = elem.parent();

          //check width and height and apply styling to parent here.
        });
      }
    };
  });
