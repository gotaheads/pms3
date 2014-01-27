'use strict';

angular.module('pms3App')
  .controller('ViewPropertyCtrl', ['$scope','$routeParams', '$log', 'propertyService',
    function ($scope, $routeParams, $log, propertyService) {
      var code = $routeParams.code;
      $scope.code = code;

      $scope.types = [
        'Residential (House)',
        'Residential (Unit)',
        'Commercial/Industrial',
        'Residential'];
      $scope.states = ['VIC',
        'NSW',
        'QLD',
        'SA',
        'TAS',
        'NT',
        'WA'
      ];
      $scope.numBedRooms = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

      $log.info('ViewPropertyCtrl code: ' + code);

      propertyService.loadPropertyByCode($scope, code);
  }]);
