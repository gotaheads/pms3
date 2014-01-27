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

      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();
      $scope.showWeeks = true;
      $scope.toggleWeeks = function () {
        $scope.showWeeks = ! $scope.showWeeks;
      };

      $scope.clear = function () {
        $scope.dt = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function() {
        //$scope.minDate = ( $scope.minDate ) ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      };

      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
      };

      $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
      $scope.format = $scope.formats[0];


      $log.info('ViewPropertyCtrl code: ' + code);

      propertyService.loadPropertyByCode($scope, code);
  }]);
