'use strict';

angular.module('pms3App')
  .controller('MainCtrl', ['$scope', '$log', 'propertyService', '$rootScope',
    function ($scope, $log, propertyService, $rootScope) {
    //$scope.code= 'ABEL001';
    $scope.selectedProperty = '',
    $scope.selectedClient = '';
    $scope.year = $scope.year();
    $scope.years = [];
    var year = new Date().getFullYear();
    for (var i = year - 2; i <= year; i++) {
      $scope.years.push(i);
    }

    $scope.years.reverse();

    $scope.select = function(year) {
      $log.info('select: ', year);
      $rootScope.year(year);
    }

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
