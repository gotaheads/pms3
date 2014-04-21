'use strict';

angular.module('pms3App')
  .service('valuations', ['$log', '$routeParams',
    function reportService($log, $routeParams) {
      $log.info('start valuations ');

      var valuations = {};
      var years = [];
      var clients = [];
      var propsByClientCode = {};
      var marketValuesByPropCode = {};
      var marketMediansBySuburb = {};

      function loadClientProps(properties) {
        var propsByCode = {};
        properties.forEach(function(p) {
          if(propsByCode[p.c_code] === undefined) {
            propsByCode[p.c_code] = [];
          }
          propsByCode[p.c_code].push(p);
        });
        return propsByCode;
      }

      function findPropertiesByClientCode(code) {
        var val = propsByClientCode[code];
        return !!val?val:{};
      }

      function loadPropertyMarketValues(marketValues) {
        var marketValuesByCode = {};
        marketValues.forEach(function(i) {
          if(marketValuesByCode[i.p_code] === undefined) {
            marketValuesByCode[i.p_code] = [];
          }
          marketValuesByCode[i.p_code].push(i);
        });
        $log.info('loadPropertyMarketValues: ' + marketValuesByCode.length);
        return marketValuesByCode;
      }

      function findMarketValuesByCode(p_code) {
        var values = marketValuesByPropCode[p_code];
        return !!values?values:[];
      }

      function loadMarketMedians(marketMedians) {
        var marketMediansBySuburb = {};
        marketMedians.forEach(function(i) {
          if(marketMediansBySuburb[i.p_townsuburb] === undefined) {
            marketMediansBySuburb[i.p_townsuburb] = {};
          }
          if(marketMediansBySuburb[i.p_townsuburb][i.p_year] === undefined) {
            marketMediansBySuburb[i.p_townsuburb][i.p_year] = i;
          }
        });
        return marketMediansBySuburb;
      }

      function findMarketMedian(p_townsuburb, year) {
        var vals = marketMediansBySuburb[p_townsuburb],
          val = !!vals?vals[year]:{};
        return !!val?val.p_marketmedian:0;
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
        var suburb = p.p_townsuburb,
            val = [{key: p.address,color:'#ff7f0e',values:[]},
                   {key:(suburb?suburb:'Market Median'),color:'#1f77b4',values:[]}];

        p.marketValues.forEach(function(v) {
          var x = new Date(v.year, 5, 30, 12,0,0).getTime();
          val[0].values.push({x:x, y:v.yearofmarkval});
          val[1].values.push({x:x, y:v.marketMedian});
        });
        return val;
      }

      function calculateValuationTotal(clients) {
        var i = 0;
        var calculated = [];
        clients.forEach(function(c) {
          var client = c;
          //$log.info('c.code: ' + c.code +' '+ i++);
          client.properties = findPropertiesByClientCode(c.code);
          client.totalOriginalCost = 0;
          client.properties.forEach(function(p) {
            client.totalOriginalCost += p.p_origcost;
            p = initMarketValues(p);
          });

          calculated.push(client);
        });
        var sample = calculated[0];
        $log.info('sample  ' + angular.toJson(sample));
        return calculated;
      }

      valuations.load = function($scope, data) {
          years = $scope.rests.convertItems(data.years);
          clients = $scope.rests.convertItems(data.codes);

          propsByClientCode = loadClientProps($scope.rests.convertItems(data.properties));

          marketValuesByPropCode = loadPropertyMarketValues($scope.rests.convertItems(data.marketValues));

          marketMediansBySuburb = loadMarketMedians($scope.rests.convertItems(data.marketMedians));

          $scope.clients = calculateValuationTotal(clients);
      }

      return valuations;

    }]);
