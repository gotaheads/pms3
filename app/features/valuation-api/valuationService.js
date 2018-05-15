'use strict';

angular.module('pms3App')
  .service('valuationService', ['$http', '$log', '$q',
    function valuationService($http, $log, $q) {
      $log.info('start valuationService ');

      var createUrl = function(context) {
        return VALUATION_PDF_API + context;
        //return 'https://pms.nakanoya.com.au' + context;
      }

      var valuationService = {}
      ;

      valuationService.pdf = function(year, number) {
        $log.info('valuationService.pdf year: ', year, ', number: ', number);
        var url = createUrl('/generators?year=' + year + '&number=' + number);
        return valuationService.isAuthenticated().then(function(authenticated) {
          return authenticated? url: $q.reject(false);
        })
      }
      //
      // valuationService.generatePdf = function(year, number) {
      //   $log.info('valuationService.generatePdf year: ', year, ', number: ', number);
      //   var url = createUrl('/generators?year=' + year + '&number=' + number);
      //   return valuationService.isAuthenticated().then(function(authenticated) {
      //     return $http.get(url, { withCredentials: true });
      //   })
      //   .then(function (res) {
      //     return res.data.authenticated;
      //   });
      // }

      valuationService.isAuthenticated = function() {
        $log.info('valuationService.isAuthenticated');
        var url = createUrl('/auth/authenticated');
        return $http.get(url, {
          withCredentials: true
        }).then(function (res) {
          return res.data.authenticated;
        });
      }

      return valuationService;

    }]);
