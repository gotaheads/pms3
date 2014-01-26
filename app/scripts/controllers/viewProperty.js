'use strict';

angular.module('pms3App')
  .controller('ViewPropertyCtrl', ['$scope','$routeParams', '$log', 'propertyService',
    function ($scope, $routeParams, $log, propertyService) {

      $scope.code = $routeParams.code;

      $log.info('ViewPropertyCtrl code: ' + $scope.code);

  }]);
