'use strict';

angular.module('pms3App')
  .controller('TownSuburbsCtrl', ['$scope', '$log', 'rests',
    function ($scope, $log, rests) {
      $scope.year = $scope.year(),
      $scope.years = [],
      $scope.types = ['Residential (House)','Residential (Unit)'],
      $scope.states = ['VIC', 'NSW'],
      $scope.type = $scope.types[0],
      $scope.state = 'VIC';
      $scope.adding = {p_marketmedian: undefined, p_townsuburb: ''};

      for (var i = 2005; i <= $scope.year; i++) {
        $scope.years.push(i);
      }
      $scope.years.sort(function (a, b) {
        return b - a
      });

      $log.info('TownSuburbsCtrl :' + $scope.year);
      function param($scope) {
        return 'year=' + $scope.year +
               '&type=' + $scope.type +
               '&state=' + $scope.state;
      }

      $scope.load = function() {
        $scope.createGet('townsuburb/year/',
            param($scope)).then(function (data) {
            var d = data.data;
            var townsuburbs = $scope.rests.convertItems(d);
            $scope.townsuburbs = townsuburbs;
            $log.info('townsuburb loaded: ');
          });
      }

      $scope.load();

      $scope.save = function(valid) {
        $log.info('saving ... valid? ' + valid + ' ' + $scope.townsuburbs.length);

        rests.post('townsuburb/update/',
                  param($scope), $scope.townsuburbs);
      }

    }]);
