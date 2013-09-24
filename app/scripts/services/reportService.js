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

        $scope.years = [];
        for (var i = 2007; i <= 2013; i++) {
          $scope.years.push(createYear(i));
        }
//
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

          function sinAndCos() {
            var sin = [],
              cos = [],
              rand = [],
              rand2 = []
              ;

            for (var i = 2007; i <= 2013; i++) {
              var d = createYear(i);
              //$log.info('d?' + d);
              data1.push({x: d, y: i + 10 });
              cos.push({x: d, y: i +  225});
            }

            return [
              {
                area: false,
                values: data1,
                key: "Sine Wave",
                color: "#ff7f0e"
              },
              {
                values: cos,
                key: "Cosine Wave",
                color: "#2ca02c"
              }
            ];
          }


//          [
//            {
//              "key": "29 Dover St RICHMOND 3121 VIC",
//              "values": [
//                {"x": 1183212000000, "y": 425000},
//                {"x": 1214834400000, "y": 560000 },
//                {"x": 1246370400000, "y": 560000 },
//                {"x": 1277906400000, "y": 560000 },
//                {"x": 1309442400000, "y": 560000 },
//                {"x": 1341064800000, "y": 560000 },
//                {"x": 1372600800000, "y": 560000 }
//              ]
//            }
//            ,
//            {
//              "key": "9/106 ELIZABETH BAY ROAD ELIZABETH BAY 2011 NSW",
//              "values": [
//                {"x": 1183212000000, "y": 550000},
//                {"x": 1214834400000, "y": 550000 },
//                {"x": 1246370400000, "y": 560000 },
//                {"x": 1277906400000, "y": 560000 },
//                {"x": 1309442400000, "y": 560000 },
//                {"x": 1341064800000, "y": 560000 },
//                {"x": 1372600800000, "y": 560000 }
//              ]
//            }
//          ]


//          data = [
//            {
//              "key" : "Quantity" ,
//              "values" : [ [ 1183212000000 , 1271000.0] , [ 1214834400000 , 1271000.0]]
//            },
//            {
//              "key" : "Price" ,
//              "values" : [ [ 1183212000000 , 71.89] , [ 1214834400000 , 75.51]]
//            }
//          ].map(function(series) {
//              series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
//              return series;
//            });
//
//          nv.addGraph(function () {
//            var chart = nv.models.linePlusBarChart()
//              .margin({top: 30, right: 60, bottom: 50, left: 70})
//              .x(function(d,i) { return i })
//              .color(d3.scale.category10().range());
//
//            chart.xAxis.tickFormat(function(d) {
//              var dx = data[0].values[d] && data[0].values[d].x || 0;
//
//              return dx ? d3.time.format('%d/%m/%Y')(new Date(dx)) : '';
//            })
//              .showMaxMin(false);
//
//            chart.y1Axis
//              .tickFormat(d3.format(',f'));
//
//            chart.y2Axis
//              .tickFormat(function(d) { return '$' + d3.format(',.2f')(d) });
//
//            chart.bars.forceY([0]).padData(false);
//            //chart.lines.forceY([0]);
//
//            d3.select('#chart svg')
//              .datum(data)
//              .transition().duration(500).call(chart);
//
//            nv.utils.windowResize(chart.update);
//
//            chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
//
//            return chart;
//          });
        });
//      d3.json('bower_components/nvd3-1.1.10/stackedAreaData.json', function(data) {
//           nv.addGraph(function() {
//
//             $log.info('add chart');
//
//               var chart = nv.models.stackedAreaChart()
//                             .x(function(d) { return d[0] })
//                             .y(function(d) { return d[1] })
//                             .clipEdge(true);
//
//               chart.xAxis
//                   .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
//
//               chart.yAxis
//                   .tickFormat(d3.format(',.2f'));
//
//               d3.select('#chart svg')
//                 .datum(data)
//                   .transition().duration(500).call(chart);
//
//               nv.utils.windowResize(chart.update);
//
//               return chart;
//             });
//      });
//        [ 1246370400000 , 560000] ,
//          [ 1277906400000 , 575000] ,
//          [ 1309442400000 , 600000] ,
//          [ 1341064800000 , 625000] ,
//          [ 1030766400000 , 625000] ,
//          [ 1372600800000 , 625000]


      }

    }]);
