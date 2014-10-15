'use strict';

angular.module('pms3App')
  .service('clientPropertiesService', ['$log', '$routeParams','valuations',
    function clientPropertiesService($log, $routeParams,valuations) {
      $log.info('start clientPropertiesService ');

      var clientPropertiesService = {},batchSize = 30,
        today = Date.today(),
        current = parseInt(today.toString('MMdd')),
        year = parseInt(today.toString('yyyy')),
        year = (current>630?year:year-1),
        years = [];
      for(var i  = 2006; i < year; i++) {
        years.push(i);
      }
      $log.info('current ' + current + ' year ' + year);

      clientPropertiesService.years = function() {
        return years;
      }
      clientPropertiesService.year = function() {
        return year;
      }
      clientPropertiesService.batchSize = function() {
        return batchSize;
      }
      clientPropertiesService.loadActions = function(clientCount, batchSize) {
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

      clientPropertiesService.yearParam = function ($scope) {
        return 'year=' + $scope.year;
      }

      clientPropertiesService.load = function ($scope) {
        $log.info('clientPropertiesService :' + $scope.year);
        $scope.props = [];

        $scope.createGet('client/properties/',clientPropertiesService.yearParam($scope)).then(function(data) {

            var d = data.data;
            var props = $scope.rests.convertItems(d.properties);
            $scope.props = props;

            $log.info('transformed');

          });

      }


      return clientPropertiesService;

    }]);
