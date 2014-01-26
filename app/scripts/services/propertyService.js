'use strict';

angular.module('pms3App')
  .service('propertyService', ['$log', '$rootScope',
    function propertyService($log, $rootScope) {
      var props = [];

      this.load = function($scope) {
        $scope.properties = [];

        $rootScope.createGet('property/load').then(function(data) {
          var ps = (data.data.DATA);
          //$log.info('propertyService loaded: ' + angular.toJson(ps));
          ps.forEach(function(p) {
            $scope.properties.push(p[0]);
          });
          //$log.info('propertyService transformed: ' + angular.toJson($scope.properties));



        });
      }
  }]);
