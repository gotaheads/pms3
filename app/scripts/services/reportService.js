'use strict';

angular.module('pms3App')
  .service('reportService', ['$log', '$routeParams','valuations',
    function reportService($log, $routeParams,valuations) {
      $log.info('start reportService ');

      var reportService = {},batchSize = 30,
        today = Date.today(),
        current = parseInt(today.toString('MMdd')),
        year = parseInt(today.toString('yyyy')),
        year = (current>630?year:year-1),
        years = [];
      for(var i  = 2006; i < year; i++) {
        years.push(i);
      }
      $log.info('current ' + current + ' year ' + year);

      reportService.years = function() {
        return years;
      }
      reportService.year = function() {
        return year;
      }
      reportService.batchSize = function() {
        return batchSize;
      }
      reportService.loadActions = function(clientCount, batchSize) {
        var actions = [];
        var batch = Number(batchSize),
            times = clientCount/batch;
        var no = 0;
        var from = 1;
        var to = batch;
        for(var i = 0; i < times; i++) {
          no = i+1;
          actions.push({batch:i, no:no, from:from,to:to});
          from = to + 1;
          to += batch;
          to = (to < clientCount? to:clientCount);
        }
        return actions;
      }

      reportService.loadSelection = function ($scope) {
        $log.info('reportService :' + $scope.year);


        $scope.createGet('valuation-by-landlord/select/',
            'year=' + $scope.year).then(function(data) {

            var d = data.data;
            var propertyCount = $scope.rests.convertItems(d.propertyCount)[0].count,
              marketValueCount = $scope.rests.convertItems(d.marketValueCount)[0].count,
              clientCount = $scope.rests.convertItems(d.clientCount)[0].count,
              clients = $scope.rests.convertItems(d.clients);

            $scope.propertyCount = propertyCount;
            $scope.clientCount = clientCount;
            $scope.marketValueCount = marketValueCount;
            $scope.actions = reportService.loadActions(clientCount, batchSize);
            $scope.batchSize = batchSize;
            $scope.clients = [];
            $scope.actions.forEach(function(a) {
              $scope.clients[a.batch] = clients.slice(a.from - 1, a.to);
            });

            $log.info('valuations transformed');

          });

      }

      reportService.load = function ($scope) {
        var from = $routeParams.from;
        var to = $routeParams.to,
          year = $routeParams.year;
        $scope.year = year;
        $log.info('reportService from:' + from + ' ' + year);

        $scope.createGet('valuation/',
            'from='+from+'&to='+to+'&year=' +year).then(function(data) {

          valuations.load($scope, data.data, year);

        });


      }
      return reportService;

    }]);
