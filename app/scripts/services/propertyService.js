'use strict';

angular.module('pms3App')
  .service('propertyService', ['$log', '$rootScope',
    function propertyService($log, $rootScope) {
      var props = [];
      var editing = {};

      function convertItems(data) {
        var props = data.COLUMNS;
        var rows = data.DATA;
        var items = [];
        for(var ri = 0; ri < rows.length; ri++) {
          var values = rows[ri];
          var item = {};
          for(var i = 0; i < props.length; i++) {
            var prop = props[i].toLowerCase();
            item[prop] = values[i];
          }
          items.push(item);
        }
        return items;

      }

      function convertItem(data) {
        var props = data.COLUMNS;
        var values = data.DATA[0];
        var property = {}
        for(var i = 0; i < props.length; i++) {
          var prop = props[i].toLowerCase();
          property[prop] = values[i];
        }
        return property;
      }

      function find(items, prop, val) {
        for(var i = 0; i < items.length; i++) {
          var item = items[i];
          var toCheck = item[prop];
          if(val == toCheck) {
            return item;
          }
        }
        return undefined;
      }

      this.loadPropertyByCode = function($scope, code) {
        $scope.editing = [];

        $rootScope.createGet('landlord/load').then(function(data) {
          var landlords = convertItems(data.data);
          $scope.landlords = landlords;

          $log.info('propertyService landlords transformed: ' +
            landlords.length);

          var landlord = find(landlords, 'l_number', editing.p_llnumb);

          if(landlord) {
            $scope.landlord = landlord.l_name;
          }
        });

        $rootScope.createLoadProperty(code).then(function(data) {
          editing = convertItem(data.data);
          $scope.editing = editing;



          $scope.puchDate = (editing.p_purchdate?new Date(editing.p_purchdate):'');
          $scope.settleDate = (editing.p_settledate?new Date(editing.p_settledate):'')
          $log.info('propertyService.createLoadProperty transformed: ' +
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
