'use strict';

angular.module('pms3App')
  .service('reportService', ['$log', '$routeParams',
    function reportService($log, $routeParams) {
      $log.info('start reportService ');

      var batchSize = 100;

      this.loadSelection = function ($scope) {
        $log.info('reportService :' + $scope.year);


        $scope.createGet('valuation/select/',
            'year=2013').then(function(data) {

            var d = data.data;
            var properties = $scope.rests.convertItems(d.properties)[0].count;
            var clients = $scope.rests.convertItems(d.clients)[0].count;

            $scope.properties = properties;
            $scope.clients = clients;

            var actions = [];
            var times = clients/batchSize;
            var no = 0;
            var from = 1;
            var to = batchSize;
            for(var i = 0; i < times; i++) {
              no = i+1;
              from = from;
              to = to;
              actions.push({batch:i, no:no, from:from,to:to});
              from = to + 1;
              to += batchSize;
              to = (to < clients? to:clients);
            }
            $scope.actions = actions;
//            $scope.rows = [];
//            var cols = 4;
//            for(var i = 0; i < actions.length; i++) {
//              $scope.rows[0]
//            }



            $log.info('valuations transformed properties: ' + properties.length);

          });;

      }

      this.load = function ($scope) {
        var from = $routeParams.from;
        var to = $routeParams.to;
        $log.info('reportService from:' + from);


        $scope.createGet('valuation/',
            'from='+from+'&to='+to+'&year=2013').then(function(data) {

          var d = data.data;
          var codes = $scope.rests.convertItems(d.codes);
          var properties = $scope.rests.convertItems(d.properties);
          var byCode = {};

          properties.forEach(function(p) {
            if(byCode[p.c_code] === undefined) {
              byCode[p.c_code] = [];
            }
            byCode[p.c_code].push(p);
          });

          function findPropertiesByClientCode(code) {
            var val = byCode[code];
            return !!val?val:{};
          }

          var years = $scope.rests.convertItems(d.years);

          var marketValues = $scope.rests.convertItems(d.marketValues);

          var marketValuesByCode = {};
          marketValues.forEach(function(i) {
            if(marketValuesByCode[i.p_code] === undefined) {
              marketValuesByCode[i.p_code] = [];
            }
            marketValuesByCode[i.p_code].push(i);
          });
          function findMarketValuesByCode(p_code) {
            var values = marketValuesByCode[p_code];
            return !!values?values:[];
          }

          function initMarketValues(p) {
            p.marketValues = findMarketValuesByCode(p.pcode);
            p.chart = [];
            p.marketValues.forEach(function(v) {
              v.marketMedian = findMarketMedian(p.p_townsuburb, v.year);
            });

            p.chart = createChart(p);

            return p;
          }

          function createChart(p) {
            var val = [{key: p.address,color:'#ff7f0e',values:[]},
                       {key:'Market Median',color:'#1f77b4',values:[]}];

            p.marketValues.forEach(function(v) {
              var x = new Date(v.year, 5, 30, 12,0,0).getTime();
              val[0].values.push({x:x, y:v.yearofmarkval});
              val[1].values.push({x:x, y:v.marketMedian});
            });
            return val;
//            return [
//              {
//                "key": "29 Dover St RICHMOND 3121 VIC",
//                "color": "#ff7f0e",
//                "values": [
//                  {"x": 1183212000000, "y": 425000},
//                  {"x": 1214834400000, "y": 560000 },
//                  {"x": 1246370400000, "y": 560000 },
//                  {"x": 1277906400000, "y": 555000 },
//                  {"x": 1309442400000, "y": 645000 },
//                  {"x": 1341064800000, "y": 645000 },
//                  {"x": 1372600800000, "y": 645000 }
//                ]
//              }
//              ,
//              {
//                "key": "Market Median",
//                "color": "#1f77b4",
//                "area": true,
//                "values": [
//                  {"x": 1183212000000, "y": 675000},
//                  {"x": 1214834400000, "y": 670000 },
//                  {"x": 1246370400000, "y": 680000 },
//                  {"x": 1277906400000, "y": 775000 },
//                  {"x": 1309442400000, "y": 825000 },
//                  {"x": 1341064800000, "y": 795000 },
//                  {"x": 1372600800000, "y": 745000 }
//                ]
//              }
//            ];
          }

          var marketMedians = $scope.rests.convertItems(d.marketMedians);
            var marketMediansBySuburb = {};
            marketMedians.forEach(function(i) {
              if(marketMediansBySuburb[i.p_townsuburb] === undefined) {
                marketMediansBySuburb[i.p_townsuburb] = {};
              }
              if(marketMediansBySuburb[i.p_townsuburb][i.p_year] === undefined) {
                marketMediansBySuburb[i.p_townsuburb][i.p_year] = i;
              }
          });


          function findMarketMedian(p_townsuburb, year) {
            var vals = marketMediansBySuburb[p_townsuburb],
            val = !!vals?vals[year]:{};
            return !!val?val.p_marketmedian:0;
          }

//          $scope.codes = codes;

          $log.info('valuations transformed codes: ' + codes.length +
            ' properties: ' + properties.length +
            ' years: ' + years.length +
            ' marketValues: ' + marketValues.length +
            ' marketMedians: ' + marketMedians.length);

          $scope.clients = [];
          var i = 0;
          codes.forEach(function(c) {
            var client = c;
            //$log.info('c.code: ' + c.code +' '+ i++);
            client.properties = findPropertiesByClientCode(c.code);

            client.totalOriginalCost = 0;
            client.properties.forEach(function(p) {
              client.totalOriginalCost += p.p_origcost;
              p = initMarketValues(p);
            });

            $scope.clients.push(client);
          });

          $log.info('');
          var sample = codes[0];

          $log.info('sample  ' + angular.toJson(sample));

        });


        var createYear = function (year) {
          return new Date(0, 0, 0, 0, 0, 0).setFullYear(year, 6, 1);
        }

        $scope.viewing = {address:'29 Dover St RICHMOND 3121 VIC'};

        $scope.years = [];

        d3.json('data/report.json', function (data) {
          $log.info('data for chart: ' + angular.toJson(data));
          $scope.data = data;
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
                //$log.info('d??' + d);
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
