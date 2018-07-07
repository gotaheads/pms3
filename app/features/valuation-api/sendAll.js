'use strict';

angular.module('pms3App')
  .service('sendAll', ['$http', '$log', '$q', '$rootScope', '$interval',
    'sendEmail',
    function sendAll($http, $log, $q, $rootScope, $interval, sendEmail) {
      $log.info('start sendAll ');

      var sendAll = {},
        cancelled = false
      ;

      sendAll.cancel = function() {
        $log.info('sendAll.cancel cancelled');
        var deferred = $q.defer();
        cancelled = true;
        deferred.resolve({});
        return deferred.promise;
      }

      var stop;
      var cancelInterval = function() {
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
        }
      }


      sendAll.start = function(year, sending, landlordsToSend, startBy, sendAllStatus) {
        cancelled = false;
        $log.info('sendAll.start sending: ', sending);
        sending.status = 'SENDING';
        sendAllStatus.resumeAt = new Date();

        return $http.put($rootScope.createGetUrl('valuation-by-landlord/send-all/start/index'),  { startBy: startBy })
          .then(function (_) {

            var chain = $q.when();

            landlordsToSend
              //.slice(0, 100)
              .forEach(function (laondlord, idx) {
              $log.info('sendAll for laondlord: ', laondlord,
                ', idx: ', idx);
              laondlord.idx = idx;
              chain = chain.then(function() {
                if(cancelled) {
                  sendAllStatus.sending = undefined;
                  sendAllStatus.end = new Date();
                  sendAllStatus.duration = moment.duration(sendAllStatus.end.getTime() - sendAllStatus.start.getTime(), 'seconds').humanize();
                  cancelInterval();
                  $rootScope.$broadcast('email-status', sendAllStatus);
                  throw new Error('Cancelled!');
                }



                $log.info('sendAll sending to landlord: ', laondlord);
                laondlord.start = new Date();
                sendAllStatus.sending = laondlord;
                sendAllStatus.landlords[laondlord.idx] = laondlord;

                cancelInterval();

                stop = $interval(function() {
                  laondlord.elapsed = new Date();
                  laondlord.duration = moment.duration(laondlord.elapsed.getTime() - laondlord.start.getTime()).asSeconds();
                  $rootScope.$broadcast('email-status', sendAllStatus);
                }, 1000);

                $rootScope.$broadcast('email-status', sendAllStatus);

                return sendEmail.send(year, laondlord, sending)
                  .then(function (laondlord) {
                    var landlordSent = sendAllStatus.landlords[laondlord.idx];
                    landlordSent.end = new Date();
                    landlordSent.duration = moment.duration(landlordSent.end.getTime() - landlordSent.start.getTime()).asSeconds();
                    landlordSent.countToSend--;
                    sendAllStatus.estimatedDuration = moment.duration(landlordSent.countToSend * landlordSent.duration, 'seconds').humanize();
                    sendAllStatus.sent = landlordSent;

                    $rootScope.$broadcast('email-status', sendAllStatus);
                    return sendAllStatus;
                  })
                  .catch(function (err) {
                    $log.error('sendAll send err: ', err, ', err.status: ', err.status);
                    cancelInterval();

                    sendAllStatus.error = !!err.data?err.data.err: err;

                    sendAllStatus.landlordWithErrors.push(laondlord);

                    $rootScope.$broadcast('email-send-error', sendAllStatus);

                    switch (err.status) {
                      case 504:
                        $log.info('sendAll 504, unknown error,  resume operation');
                        return sendAllStatus;
                      case 401:
                      default:
                        throw new Error('Error!');
                        //return Promise.reject(sendAllStatus);
                    }
                  });
              });
            });

            return chain;
            //return {};
          });
      }


      return sendAll;

    }]);
