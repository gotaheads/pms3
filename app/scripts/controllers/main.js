'use strict';

angular.module('pms3App')
  .controller('MainCtrl', ['$scope', '$log', 'propertyService',
    function ($scope, $log, propertyService) {
    $scope.code= 'BING001';
    $scope.selected = '';

    propertyService.loadCodes($scope);

    $scope.loadProperty = function() {
      $log.info('loadProperty: ' + $scope.selected)

      if($scope.selected.length == 10) {
        $scope.viewProperty($scope.selected);
      }
    }
  }]);
