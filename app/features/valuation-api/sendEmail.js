'use strict';

angular.module('pms3App')
  .service('sendEmail', ['$http', '$log', '$q', '$rootScope',
    'isAuthenticated',
    function sendEmail($http, $log, $q, $rootScope,
                       isAuthenticated) {
      $log.info('start sendEmail ');

      var createUrl = function(context) {
        return VALUATION_PDF_API + context;
      }

      var sendEmail = {}
      ;

      sendEmail.send = function(year, landlord, sending) {
        var email = 'valuations@portfolioms.com.au',
          number = landlord.code,
          name = landlord.name;

        if(sending.test) {
          landlord.email = email;
        }

        $log.info('sendEmail.send year: ', year, ', number: ', number, ', name: ', name,
          ', sending: ', sending);
        sending.year = year;
        sending.name = name;
        sending.number = number;

        var url = createUrl('/email/test?year=' + year + '&number=' + number
          + '&name=' + encodeURIComponent(name)
          + '&email=' + encodeURIComponent(landlord.email));
        return isAuthenticated.isAuthenticated().then(function(authenticated) {
          return authenticated? $http.post(url, sending, { withCredentials: true }) : $q.reject(false);
        }).then(function (_) {
          console.log('sendEmail sent, recording...');
          return $http.post($rootScope.createGetUrl('valuation-by-landlord/history/index'),  {
            year: year,
            number: number,
            email: landlord.email,
          });
        }).then(function () {
          return landlord;
        });
      }


      return sendEmail;

    }]);
