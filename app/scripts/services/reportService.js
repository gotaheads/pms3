'use strict';

angular.module('pms3App')
  .service('reportService', ['$log', '$routeParams',
    function reportService($log, $routeParams) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      $log.info('start reportService ');

      this.load = function ($scope) {
        var code = $routeParams.code;

        $log.info('reportService code:' + code);

        var createYear = function (year) {
          return new Date(0, 0, 0, 0, 0, 0).setFullYear(year, 6, 1);
        }

        $scope.viewing = {address:'29 Dover St RICHMOND 3121 VIC'};


//        2007 Market Value
//        $425,000
//        $560,000
//        $550,000
//        $645,000
//        $645,000
//        $645,000
//        $650,000


        $scope.years = [];
//        for (var i = 2007; i <= 2013; i++) {
//          $scope.years.push(createYear(i));
//        }
//        $scope.d2013 = new Date(0, 0, 0, 0, 0, 0).setFullYear(2013, 6, 1);


        d3.json('data/report.json', function (data) {
          var data1 = [];
          nv.addGraph(function() {
            var chart = nv.models.lineChart()
              .options({
                margin: {left: 100, bottom: 100},
                x: function(d,i) { return i},
                showXAxis: true,
                showYAxis: true,
                transitionDuration: 250
              }).color(d3.scale.category10().range());
            ;

            // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
            chart.xAxis
              .axisLabel("Years")
              .tickFormat(function(d) {
                var dx = data[0].values[d] && data[0].values[d].x || 0;
                //var dx = data1[d].x;
                //$log.info('d' + d + ' ' + dx);
                return dx ? d3.time.format('%m/%Y')(new Date(dx)) : '';
              });

            chart.yAxis
              .axisLabel('Market value')
              .tickFormat(function(d) {
                $log.info('d??' + d);
                return d;
              });

            d3.select('#chart svg')
              .datum(data)
              .call(chart);

            //TODO: Figure out a good way to do this automatically
            nv.utils.windowResize(chart.update);

            chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

            return chart;
          });


        });

      }

    }]);
