'use strict';

angular.module('pms3App')
  .service('valuationService', ['$http', '$log', '$q', '$rootScope',
    'sendAll', 'sendEmail', 'isAuthenticated',
    function valuationService($http, $log, $q, $rootScope,
                              sendAll, sendEmail, isAuthenticated) {
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
        return sendEmail.send(year, landlord, sending);
      }

      valuationService.saveEmail = function(sending) {
        $log.info('valuationService.saveEmail sending: ', sending);
        return $http.post($rootScope.createGetUrl('valuation-by-landlord/email-content/index'),  {
          content: sending.content,
          overviewLink: sending.overviewLink,
          test: sending.test
        });
      }

      valuationService.sendAll = function(year, sending, landlordsToSend, startBy) {
        return sendAll.start(year, sending, landlordsToSend, startBy).then(function (sendAllStatus) {
          $log.info('valuationService.sendAll  sendAllStatus: ', sendAllStatus);
          return sendAllStatus;
        });
      }

      valuationService.cancelAll = function(year, sending, landlordsToSend) {
        $log.info('valuationService.cancelAll sending: ', sending);
        sending.status = 'TO_SEND';


        return sendAll.cancel()
          .then(function () {
            return $http.put($rootScope.createGetUrl('valuation-by-landlord/send-all/end/index'),  {})
          })
          .then(function () {
            return valuationService.saveEmail(sending);
          });
      }

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
        return isAuthenticated.isAuthenticated();
      }

      return valuationService;

    }]);
