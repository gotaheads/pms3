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
          var byCode = [];
          properties.forEach(function(p) {
            if(byCode[p.c_code] === undefined) {
              byCode[p.c_code] = [];
            }
            byCode[p.c_code].push(p);
          });
          var years = $scope.rests.convertItems(d.years);
          var marketValues = $scope.rests.convertItems(d.marketValues);
          var marketMedians = $scope.rests.convertItems(d.marketMedians);

//          $scope.codes = codes;
//
          $log.info('valuations transformed codes: ' + codes.length +
            ' properties: ' + properties.length +
            ' years: ' + years.length +
            ' marketValues: ' + marketValues.length +
            ' marketMedians: ' + marketMedians.length);

          $scope.clients = [];

          codes.forEach(function(c) {
            var client = c;
            client.properties =byCode[c.code];
            client.totalOriginalCost = 0;
            client.properties.forEach(function(p) {
              client.totalOriginalCost += p.p_origcost;
            });


            $scope.clients.push(client);
          });


        });;


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
