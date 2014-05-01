'use strict';

angular.module('pms3App')
  .service('reportService', ['$log', '$routeParams','valuations',
    function reportService($log, $routeParams,valuations) {
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
            $log.info('valuations transformed properties: ' + properties.length);

          });

      }

      this.load = function ($scope) {
        var from = $routeParams.from;
        var to = $routeParams.to;
        $log.info('reportService from:' + from);


        $scope.createGet('valuation/',
            'from='+from+'&to='+to+'&year=2013').then(function(data) {

          valuations.load($scope, data.data);

//          var d = data.data;
//
//          var codes = $scope.rests.convertItems(d.codes);
//          var properties = $scope.rests.convertItems(d.properties);
//          var byCode = {};
//
//          properties.forEach(function(p) {
//            if(byCode[p.c_code] === undefined) {
//              byCode[p.c_code] = [];
//            }
//            byCode[p.c_code].push(p);
//          });
//
//          function findPropertiesByClientCode(code) {
//            var val = byCode[code];
//            return !!val?val:{};
//          }
//
//          var years = $scope.rests.convertItems(d.years);
//
//          var marketValues = $scope.rests.convertItems(d.marketValues);
//
//          var marketValuesByCode = {};
//          marketValues.forEach(function(i) {
//            if(marketValuesByCode[i.p_code] === undefined) {
//              marketValuesByCode[i.p_code] = [];
//            }
//            marketValuesByCode[i.p_code].push(i);
//          });
//          function findMarketValuesByCode(p_code) {
//            var values = marketValuesByCode[p_code];
//            return !!values?values:[];
//          }
//
//          function initMarketValues(p) {
//            p.marketValues = findMarketValuesByCode(p.pcode);
//            p.chart = [];
//            p.marketValues.forEach(function(v) {
//              v.marketMedian = findMarketMedian(p.p_townsuburb, v.year);
//            });
//
//            p.chart = createChart(p);
//
//            return p;
//          }
//
//          function createChart(p) {
//            var val = [{key: p.address,color:'#ff7f0e',values:[]},
//                       {key:'Market Median',color:'#1f77b4',values:[]}];
//
//            p.marketValues.forEach(function(v) {
//              var x = new Date(v.year, 5, 30, 12,0,0).getTime();
//              val[0].values.push({x:x, y:v.yearofmarkval});
//              val[1].values.push({x:x, y:v.marketMedian});
//            });
//            return val;
//
//          }
//
//          var marketMedians = $scope.rests.convertItems(d.marketMedians);
//            var marketMediansBySuburb = {};
//            marketMedians.forEach(function(i) {
//              if(marketMediansBySuburb[i.p_townsuburb] === undefined) {
//                marketMediansBySuburb[i.p_townsuburb] = {};
//              }
//              if(marketMediansBySuburb[i.p_townsuburb][i.p_year] === undefined) {
//                marketMediansBySuburb[i.p_townsuburb][i.p_year] = i;
//              }
//          });
//
//
//          function findMarketMedian(p_townsuburb, year) {
//            var vals = marketMediansBySuburb[p_townsuburb],
//            val = !!vals?vals[year]:{};
//            return !!val?val.p_marketmedian:0;
//          }
//
//          $log.info('valuations transformed codes: ' + codes.length +
//            ' properties: ' + properties.length +
//            ' years: ' + years.length +
//            ' marketValues: ' + marketValues.length +
//            ' marketMedians: ' + marketMedians.length);
//
//          $scope.clients = [];
//          var i = 0;
//          codes.forEach(function(c) {
//            var client = c;
//            //$log.info('c.code: ' + c.code +' '+ i++);
//            client.properties = findPropertiesByClientCode(c.code);
//
//            client.totalOriginalCost = 0;
//            client.properties.forEach(function(p) {
//              client.totalOriginalCost += p.p_origcost;
//              p = initMarketValues(p);
//            });
//
//            $scope.clients.push(client);
//          });
//
//          $log.info('');
//          var sample = codes[0];
//
//          $log.info('sample  ' + angular.toJson(sample));

        });


      }

    }]);
