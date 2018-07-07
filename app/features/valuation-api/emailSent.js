'use strict';

angular.module('pms3App')
  .service('emailSent', ['$http', '$log', '$rootScope',
    function emailSent($http, $log, $rootScope) {
      $log.info('start emailSent ');
      var emailSent = {}
      ;
      emailSent.record = function (sendAllStatus, laondlord) {
        $log.info('emailSent.record: ', sending);
        var landlordSent = sendAllStatus.landlords[laondlord.idx];
        landlordSent.end = new Date();
        landlordSent.duration = moment.duration(landlordSent.end.getTime() - landlordSent.start.getTime()).asSeconds();
        sendAllStatus.sent = landlordSent;

        sendAllStatus.countToSend = sendAllStatus.countToSend - 1;
        sendAllStatus.countRemaining = sendAllStatus.countLoandlods - sendAllStatus.countSent;
        sendAllStatus.estimatedDuration = moment.duration(sendAllStatus.countToSend * landlordSent.duration, 'seconds').humanize();
        $rootScope.$broadcast('email-status', sendAllStatus);
        return sendAllStatus;
      }

      return emailSent;

    }]);
