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
//        {
//          "key" : "Quantity" ,
//          "bar": true,
//          "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
//        },
//        {
//          "key" : "Price" ,
//          "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98] ]
//        }

        d3.json('data/report.json', function (data) {

          nv.addGraph(function() {
            var chart = nv.models.lineChart()
              .options({
                margin: {left: 100, bottom: 100},
                x: function(d,i) { return i},
                showXAxis: true,
                showYAxis: true,
                transitionDuration: 250
              })
            ;

            // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
            chart.xAxis
              .axisLabel("Time (s)")
              .tickFormat(d3.format(',.1f'));

            chart.yAxis
              .axisLabel('Voltage (v)')
              .tickFormat(d3.format(',.2f'));

            d3.select('#chart svg')
              .datum(sinAndCos())
              .call(chart);

            //TODO: Figure out a good way to do this automatically
            nv.utils.windowResize(chart.update);
            //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

            chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

            return chart;
          });

          function sinAndCos() {
            var sin = [],
              cos = [],
              rand = [],
              rand2 = []
              ;

            for (var i = 0; i < 100; i++) {
              sin.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) }); //the nulls are to show how defined works
              cos.push({x: i, y: .5 * Math.cos(i/10)});
              rand.push({x:i, y: Math.random() / 10});
              rand2.push({x: i, y: Math.cos(i/10) + Math.random() / 10 })
            }

            return [
              {
                area: true,
                values: sin,
                key: "Sine Wave",
                color: "#ff7f0e"
              },
              {
                values: cos,
                key: "Cosine Wave",
                color: "#2ca02c"
              },
              {
                values: rand,
                key: "Random Points",
                color: "#2222ff"
              }
              ,
              {
                values: rand2,
                key: "Random Cosine",
                color: "#667711"
              }
            ];
          }



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
