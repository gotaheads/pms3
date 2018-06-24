'use strict';

angular.module('pms3App')
  .service('isAuthenticated', ['$http', '$log', '$q', '$rootScope',
    function isAuthenticated($http, $log) {
      $log.info('start isAuthenticated ');

      var createUrl = function(context) {
        return VALUATION_PDF_API + context;
        //return 'https://pms.nakanoya.com.au' + context;
      }

      var isAuthenticated = {}
      ;

      isAuthenticated.isAuthenticated = function() {
        $log.info('isAuthenticated.isAuthenticated');
        var url = createUrl('/auth/authenticated');
        return $http.get(url, {
          withCredentials: true
        }).then(function (res) {
          return res.data.authenticated;
        });
      }

      return isAuthenticated;

    }]);
