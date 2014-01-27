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

      $log.info('ViewPropertyCtrl code: ' + code);

      propertyService.loadPropertyByCode($scope, code);
  }]);
