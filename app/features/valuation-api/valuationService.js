'use strict';

angular.module('pms3App')
  .service('valuationService', ['$http', '$log', '$q', '$rootScope',
    function valuationService($http, $log, $q, $rootScope) {
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

      valuationService.emailTest = function(year, number, name) {
        var email = 'valuations@portfolioms.com.au';
        $log.info('valuationService.emailTest year: ', year, ', number: ', number, ', name: ', name);
        var url = createUrl('/email/test?year=' + year + '&number=' + number
          + '&name=' + encodeURIComponent(name)
          + '&email=' + encodeURIComponent(email));
        return valuationService.isAuthenticated().then(function(authenticated) {
          return authenticated? $http.get(url, { withCredentials: true }) : $q.reject(false);
        })
      }

      valuationService.emailTest2 = function(year, landlord, sending) {
        var email = 'valuations@portfolioms.com.au',
        number = landlord.code,
        name = landlord.name;

        //TODO: REMOVE THIS
        if(sending.test) {
          landlord.email = email;
        }

        $log.info('valuationService.emailTest year: ', year, ', number: ', number, ', name: ', name,
          ', sending: ', sending);
        sending.year = year;
        sending.name = name;
        sending.number = number;

        var url = createUrl('/email/test?year=' + year + '&number=' + number
          + '&name=' + encodeURIComponent(name)
          + '&email=' + encodeURIComponent(landlord.email));
        return valuationService.isAuthenticated().then(function(authenticated) {
          return authenticated? $http.post(url, sending, { withCredentials: true }) : $q.reject(false);
        }).then(function (_) {
          console.log('');
          return $http.post($rootScope.createGetUrl('valuation-by-landlord/history/index'),  {
            year: year,
            number: number,
            email: landlord.email,
          });
        });
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
