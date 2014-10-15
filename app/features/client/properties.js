'use strict';

angular.module('pms3App')
  .controller('ViewPropertiesCtrl', ['$scope', '$routeParams', 'clientPropertiesService',
    function ($scope, $routeParams, clientPropertiesService) {
      var $log = $scope.$log,
        year = ($routeParams.year);
      $scope.year = year,
      $scope.years = clientPropertiesService.years(),
      $scope.bulk = clientPropertiesService.batchSize();

      $scope.export = $scope.createGetUrl('client/properties/download/',
        clientPropertiesService.yearParam($scope));

      clientPropertiesService.load($scope);


    }]);
