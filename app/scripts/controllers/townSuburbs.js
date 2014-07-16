'use strict';

angular.module('pms3App')
  .controller('TownSuburbsCtrl', ['$scope', '$log', 'rests',
    function ($scope, $log, rests) {
      $scope.year = 2013,
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

      $scope.createGet('townsuburb/year/',
          'year=' + $scope.year).then(function (data) {

          var d = data.data;
          var townsuburbs = $scope.rests.convertItems(d);
          $scope.townsuburbs = townsuburbs;

          $log.info('townsuburb loaded: ');
      });

      $scope.save = function(valid) {
        $log.info('saving ... valid? ' + valid + ' ' + $scope.townsuburbs.length);

        rests.post('townsuburb/update/', $scope.townsuburbs);
      }

    }]);
