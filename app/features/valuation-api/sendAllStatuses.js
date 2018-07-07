'use strict';

angular.module('pms3App')
  .service('sendAllStatuses', ['$log',
    function sendAllStatuses($log) {
      $log.info('start sendAllStatuses ');

      var sendAllStatuses = {};
      sendAllStatuses.load = function ($scope, emailContent) {
        $log.info('sendAllStatuses :' + $scope.year);
        var landlordNames = $scope.landlordNames = [];
        var landlords = $scope.landlords = [];
        var landlordsToSend = $scope.landlordsToSend = [];

        $scope.actions.forEach(function (a) {
          $scope.clients[a.batch].forEach(function (c) {
            var unique = c.name + ' (' + c.code + ')';
            c.id = unique;
            $scope.landlordNames.push(unique);
            $scope.landlords[unique] = c;

            if (!c.sent) {
              $scope.landlordsToSend.push(c);
            }
          })
        });

        $scope.sending.content = emailContent.content;
        $scope.sending.overviewLink = emailContent.overviewlink;
        $scope.sending.test = emailContent.test;
        $scope.sending.status = findStatus(emailContent);
        $scope.sending.startBy = emailContent.startby;

        $scope.countSent = $scope.landlordNames.length - $scope.landlordsToSend.length;
        $scope.countToSend = $scope.landlordNames.length - $scope.countSent;

        var sendAllStatus = $scope.sendAllStatus = {
          startAt: emailContent.startat,
          sending: null,
          landlords: [],
          landlordWithErrors: [],
          countSent: $scope.countSent,
          countToSend: landlordsToSend.length,
          countLoandlods: landlordNames.length,
        }

        sendAllStatus.countRemaining = sendAllStatus.countLoandlods - sendAllStatus.countSent;
        return $scope;
      }

      function findStatus(emailContent) {
        var started = emailContent.startat != null;

        return started ? 'SENDING' : 'TO_SEND';
      }

      return sendAllStatuses;
    }])
;
