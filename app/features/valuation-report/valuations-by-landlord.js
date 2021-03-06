'use strict';

angular.module('pms3App')
  .service('valuationsByLandlord', ['$log', '$routeParams','$rootScope',
    function reportService($log, $routeParams,$rootScope) {
      $log.info('start valuationsByLandlord ');

      var valuationsByLandlord = {};
      var year = $rootScope.year();
      var valuationDate = new Date('June, 30 '+year+' 00:00:00');
      var years = [];
      var clients = [];
      var propsByLandlordCode = {};
      var marketValuesByPropCode = {};
      var annualRentByPropCode = {};
      var mortgagesByPropCode = {};
      var marketMediansBySuburb = {};

      function loadLandlordProps(properties) {
        var propsByCode = {};
        properties.forEach(function(p) {
          if(propsByCode[p.l_number] === undefined) {
            propsByCode[p.l_number] = [];
          }
          propsByCode[p.l_number].push(p);
        });
        return propsByCode;
      }

      function findPropertiesByClientCode(code) {
        var val = propsByLandlordCode[code];
        return !!val?val:[];
      }

      function loadPropertyMarketValues(marketValues) {
        var marketValuesByCode = {};
        marketValues.forEach(function(i) {
          if(marketValuesByCode[i.p_code] === undefined) {
            marketValuesByCode[i.p_code] = [];
          }
          marketValuesByCode[i.p_code].push(i);
        });
        //$log.info('loadPropertyMarketValues: ' + marketValuesByCode.length);
        return marketValuesByCode;
      }

      function findMarketValuesByCode(p_code) {
        var values = marketValuesByPropCode[p_code];
        return !!values?values:[];
      }

      function loadPropertyAnnualRent(monthlyRents) {
        var annualRentByCode = {};
        for(var j = 0; j < monthlyRents.length; j++) {
          var i =monthlyRents[j];
          if(annualRentByCode[i.p_code] === undefined &&
            !!i.p_monthlyrent) {
            var r = i.p_monthlyrent;
            annualRentByCode[i.p_code] = (!!r?r*12:0);
          }

        }
        return annualRentByCode;
      }
      function findAnnualRentByCode(p_code) {
        var val = annualRentByPropCode[p_code];
        return !!val?val:0;
      }

      function loadPropertyOrigMortgage(mortgages) {
        var mortgageByCode = {};
        mortgages.forEach(function(i) {
          if(mortgageByCode[i.p_code] === undefined) {
            //var r = i.p_mortgage;
            mortgageByCode[i.p_code] = [];
          }
          mortgageByCode[i.p_code].push(i);
        });

        //$log.info('loadPropertyOrigMortgage: ' + mortgageByCode.length);
        return mortgageByCode;
      }

      function findCurrentMortgageByCode(p_code) {
        var mortgages = mortgagesByPropCode[p_code];
        var val = (!!mortgages?mortgages[mortgages.length-1].p_mortgage:0);
        return !!val?val:0;
      }

      function findOrigMortgageByCode(p_code) {
        var mortgages = mortgagesByPropCode[p_code];
        var val = (!!mortgages?mortgages[0].p_mortgage:0);
        return !!val?val:0;
      }

      function createTownSuburbKey(townsuburb, state, residentialType) {
        return townsuburb + state + residentialType;
      }

      function loadMarketMedians(marketMedians) {
        var marketMediansBySuburb = {};
        marketMedians.forEach(function(i) {
          var townsuburb = createTownSuburbKey(i.p_townsuburb, i.p_state, i.p_residentialtype);
          if(marketMediansBySuburb[townsuburb] === undefined) {
            marketMediansBySuburb[townsuburb] = {};
          }
          if(marketMediansBySuburb[townsuburb][i.p_year] === undefined) {
            marketMediansBySuburb[townsuburb][i.p_year] = i;
          }
        });
        return marketMediansBySuburb;
      }

      function findMarketMedian(p_townsuburb, p_state, p_type, year) {
        var townsuburb = createTownSuburbKey(p_townsuburb, p_state, p_type);
        var vals = marketMediansBySuburb[townsuburb],
          val = !!vals&&!!vals[year]?vals[year]:{};
        return !!val.p_marketmedian?val.p_marketmedian:0;
      }

      function initMarketValues(client, p) {
        p.marketValues = findMarketValuesByCode(p.pcode);
        p.chart = [];
        p.marketValues.forEach(function(v) {
          var value = v.yearofmarkval;
          v.marketMedian = findMarketMedian(p.p_townsuburb, p.p_state, p.p_type, v.year);
          if(v.year === year) {
            p.currentMarketValue = value;
            client.totalEstimatedCurrentValue += value;
          }
        });
        p.chart = createChart(p);
        return p;
      }

      function initAnnualRent(p) {
        p.annualRent = findAnnualRentByCode(p.pcode);
        if(p.annualRent > 0) {
          p.rentalGrowth = (p.annualRent/p.p_origcost) * 100;
        }
        return p;
      }

      function initCurrentMortgage(p) {
        var purchDate = new Date(p.p_purchdate);
        if(!purchDate) {
          return;
        }
        //<cfset day =
        // CreateDate(GetToken(valueationDate,3,"/"),
        // GetToken(valueationDate,2,"/"),
        // GetToken(valueationDate,1,"/")) - p_purchdate>
        //<cfset p = 1/(day/365)>
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var day = Math.round(Math.abs((purchDate.getTime() - valuationDate.getTime())/(oneDay)));
        var pow = 1/(day/365);
        //$log.info(' d ' + day + ' ' + pow + ' purchDate ' + purchDate + ' valuationDate ' + valuationDate);


        if(!!p.currentMarketValue) {
          //<cfset rtnIvt = ((cur_p_markVal/origcost) ^ p) - 1>
          var val = p.currentMarketValue/p.p_origcost,
              ivt = Math.pow(val, pow) - 1;
          p.rtnOnIvt = ivt*100;
          //$log.info(val + ' ivt ' + ivt);
        }

        p.mortgage = findCurrentMortgageByCode(p.pcode);
        if(p.mortgage > 0) {
          p.netEty = (p.currentMarketValue - p.mortgage);
          p.rtnOnEty = 0;
          if(p.oriNetEty > 0) {
            p.rtnOnEty = (Math.pow((p.netEty/p.oriNetEty), pow) - 1)*100;
          }

        }

        return p;
      }

      function initOrigMortgage(p) {
        p.origMortgage = findOrigMortgageByCode(p.pcode);
        if(p.origMortgage > 0) {
          p.oriNetEty = (p.p_origcost - p.origMortgage);
        }

        return p;
      }


      function createChart(p) {
        var suburb = p.p_townsuburb,
            val = [{key: p.address,color:'#ff7f0e',values:[]},
                   {key:(suburb?suburb:'Market Median'),color:'#1f77b4',values:[]}];

        p.marketValues.forEach(function(v) {
          var x = new Date(v.year, 5, 30, 12,0,0).getTime();
          var median = !!v.marketMedian?v.marketMedian: 0,
            market = !!v.yearofmarkval?v.yearofmarkval:0;
          if(market > 0) {
            val[0].values.push({x:x, y:market});
          }
          if(market > 0 && median > 0) {
            val[1].values.push({x:x, y:median});
          }
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
          client.totalEstimatedCurrentValue = 0;
          client.totalIncreaseInEquity = 0;

          client.properties.forEach(function(p) {
            client.totalOriginalCost += p.p_origcost;
            p = initOrigMortgage(p);
            p = initMarketValues(client, p);
            p = initCurrentMortgage(p);
            p = initAnnualRent(p);

          });


          client.totalIncreaseInEquity = client.totalEstimatedCurrentValue - client.totalOriginalCost;

          calculated.push(client);
        });

        var sample = calculated[0];
        //$log.info('sample  ' + angular.toJson(sample));
        return calculated;
      }

      valuationsByLandlord.load = function($scope, data, year1) {
          year = Number(year1);
          years = $scope.rests.convertItems(data.years);
          clients = $scope.rests.convertItems(data.codes);

          propsByLandlordCode = loadLandlordProps($scope.rests.convertItems(data.properties));

          marketValuesByPropCode = loadPropertyMarketValues($scope.rests.convertItems(data.marketValues));

          annualRentByPropCode = loadPropertyAnnualRent($scope.rests.convertItems(data.monthlyRents));

          mortgagesByPropCode = loadPropertyOrigMortgage($scope.rests.convertItems(data.mortgages));

          marketMediansBySuburb = loadMarketMedians($scope.rests.convertItems(data.marketMedians));

          $scope.clients = calculateValuationTotal(clients);
      }

      return valuationsByLandlord;

    }]);
