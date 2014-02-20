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

            $scope.actions = [];
            var times = clients/batchSize;
            for(var i = 0; i < times; i++) {
              $scope.actions.push({batch:i});
            }

            $log.info('valuations transformed properties: ' + properties.length);

          });;

      }
      this.load = function ($scope) {
        var code = $routeParams.code;

        $log.info('reportService code:' + code);


        $scope.createGet('valuation/',
            'code='+code+'&year=2013').then(function(data) {

          var d = data.data;
          var properties = $scope.rests.convertItems(d.properties);
          var years = $scope.rests.convertItems(d.years);
          var marketValues = $scope.rests.convertItems(d.marketValues);

          $scope.properties = properties;

          $log.info('valuations transformed properties: ' + properties.length +
            ' years: ' + years.length +
            ' marketValues: ' + marketValues.length);

        });;


        var createYear = function (year) {
          return new Date(0, 0, 0, 0, 0, 0).setFullYear(year, 6, 1);
        }

        $scope.viewing = {address:'29 Dover St RICHMOND 3121 VIC'};

        $scope.years = [];
//        for (var i = 2007; i <= 2013; i++) {
//          $scope.years.push(createYear(i));
//        }
//        $scope.d2013 = new Date(0, 0, 0, 0, 0, 0).setFullYear(2013, 6, 1);

        if(!d3) {
          var d3 = {json:function(){}};
        }
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
