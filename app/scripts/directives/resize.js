'use strict';

angular.module('pms3App')
  .directive('resize', function () {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, elem, attrs) {

        elem.on('load', function() {
          var w = elem[0].width,
              h = elem[0].height,
              wval = 175,
              width = wval+'px';

          if(w > h) {
            elem.css('width', width);
          }else {
            elem.css('height', '130px');
          }

          w = elem[0].width;
          if(w > wval) {
            elem.css('width', width);
          }
          //  var div = elem.parent();

          //check width and height and apply styling to parent here.
        });
      }
    };
  });
