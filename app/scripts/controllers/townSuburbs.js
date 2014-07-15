'use strict';

angular.module('pms3App')
  .controller('TownSuburbsCtrl', ['$scope', '$log',
    function ($scope, $log) {
      $scope.year = 2013,
      $scope.years = [],
//      $scope.types = {house: 'Residential (House)', unit: 'Residential (Unit)'};
      $scope.types = [
        'Residential (House)',
        'Residential (Unit)'];
      $scope.states = ['VIC','NSW'];
      $scope.type = $scope.types[0],
      $scope.state = 'VIC';
      $scope.adding = {p_marketmedian:0,p_townsuburb:''};
      for(var i = 2005; i <= $scope.year; i++) {
        $scope.years.push(i);
      }
      $scope.years.sort(function(a, b){return b-a});

      $log.info('TownSuburbsCtrl :' + $scope.year);

      $scope.createGet('townsuburb/year/',
          'year=' + $scope.year).then(function (data) {

          var d = data.data;
          var townsuburbs = $scope.rests.convertItems(d);
          $scope.townsuburbs = townsuburbs;


          $log.info('townsuburb loaded: ');

        });


    }]);
