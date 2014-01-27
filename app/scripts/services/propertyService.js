'use strict';

angular.module('pms3App')
  .service('propertyService', ['$log', '$rootScope',
    function propertyService($log, $rootScope) {
      var props = [];

      function convert(data) {
        var props = data.COLUMNS;
        var values = data.DATA[0];
        var property = {}
        for(var i = 0; i < props.length; i++) {
          var prop = props[i].toLowerCase();
          property[prop] = values[i];
        }
        return property;
      }
      this.loadPropertyByCode = function($scope, code) {
        $scope.editing = [];

        $rootScope.createLoadProperty(code).then(function(data) {
          var editing = convert(data.data);
          $scope.editing = editing;

          $scope.landlord = editing.p_llnumb;

          $scope.puchDate = new Date(editing.p_purchdate);

          $log.info('propertyService.loadCodes transformed: ' +
                     angular.toJson($scope.editing));
        });
      }

      this.loadCodes = function($scope) {
        $scope.properties = [];

        $rootScope.createGet('property/codes/load').then(function(data) {
          var ps = (data.data.DATA);
          ps.forEach(function(p) {
            $scope.properties.push(p[0]);
          });
          $log.info('propertyService.loadCodes transformed: ' + angular.toJson($scope.properties));
        });
      }
  }]);
