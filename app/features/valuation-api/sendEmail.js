'use strict';

angular.module('pms3App')
  .service('sendEmail', ['$http', '$log', '$q', '$rootScope',
    'isAuthenticated',
    function sendEmail($http, $log, $q, $rootScope,
                       isAuthenticated) {
      $log.info('start sendEmail ');

      var sendEmail = {}
      ;

      sendEmail.send = function(year, landlord, sending) {
        var email = 'valuations@portfolioms.com.au',
          number = landlord.code,
          name = landlord.name,
          contactName = landlord.contname;

        if(sending.test) {
          $log.info('sendEmail setting test email')
          landlord.email = email;
        }

        $log.info('sendEmail.send year: ', year, ', number: ', number, ', name: ', name,
          ', landlord.email: ', landlord.email,
          ', sending: ', sending);
        sending.year = year;
        sending.name = name;
        sending.number = number;

        var url = createValuationUrl('/email/test?year=' + year + '&number=' + number
          + '&name=' + encodeURIComponent(name)
          + '&contactName=' + encodeURIComponent(contactName)
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
