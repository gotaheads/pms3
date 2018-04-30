'use strict';

angular.module('pms3App')
  .service('valuationService', ['$http', '$log',
    function valuationService($http, $log) {
      $log.info('start valuationService ');

      var valuationService = {},
      url = 'http://localhost:3100/auth/authenticated'
      ;

      valuationService.isAuthenticated = function() {
        $log.info('valuationService.isAuthenticated');
        return $http.get(url, {
          withCredentials: true
        }).then(function (res) {
          return res.data.authenticated;
        });
      }

      return valuationService;

    }]);
