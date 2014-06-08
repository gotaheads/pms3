'use strict';

angular.module('pms3App')
  .controller('MainCtrl', ['$scope', '$log', 'propertyService',
    function ($scope, $log, propertyService) {
    //$scope.code= 'ABEL001';
    $scope.selectedProperty = '',
    $scope.selectedClient = '';

    propertyService.loadCodes($scope);

    $scope.loadProperty = function() {
      $log.info('loadProperty: ' + $scope.selectedProperty.length)

      if($scope.selectedProperty.length == 10) {
        $scope.viewProperty($scope.selectedProperty);
      }
    }
    $scope.loadClient = function() {
      $log.info('loadClient: ' + $scope.selectedClient.length)

      if($scope.selectedClient.length == 10) {
        $scope.viewProperty($scope.selectedClient);
      }
    }

  }]);
