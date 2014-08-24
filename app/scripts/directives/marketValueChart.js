'use strict';

angular.module('pms3App')
  .directive('marketValueChart', ['$log', function ($log) {
    return {
      templateUrl: 'views/partials/market-value-chart.html',
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        index: '=',
        code: '=',
        data: '='
      },
      link: function (scope, elem, attrs) {
        scope.icon = function(type) {
          switch(type) {
            case "success": return "ok-sign";
            case "warning": return "exclamation-sign";
            case "danger": return "warning-sign";
          }
        }

        var data = scope.data;
        scope.code = scope.code.replace('/','');
        //$log.info('code for chart: ' + scope.code);

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

          chart.xAxis
            .axisLabel("Years")
            .tickFormat(function(d) {
              var dx = data[0].values[d] && data[0].values[d].x || 0;
              //var dx = data1[d].x;
              //$log.info('d' + d + ' ' + dx);
              return dx ? d3.time.format('%m/%y')(new Date(dx)) : '';
            });

          chart.yAxis
            .axisLabel('Market value')
            .tickFormat(function(d) {
              return d;
            });

          d3.select('#chart'+scope.code+' svg')
            .datum(data)
            .call(chart);

          //TODO: Figure out a good way to do this automatically
          nv.utils.windowResize(chart.update);

          chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

          return chart;
        });



      }
    };
  }]);
