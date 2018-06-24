'use strict';

angular.module('pms3App')
  .service('sendAll', ['$http', '$log', '$q', '$rootScope', 'sendEmail',
    function sendAll($http, $log, $q, $rootScope, sendEmail) {
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


      sendAll.start = function(year, sending, landlordsToSend) {
        $log.info('sendAll.start sending: ', sending);
        sending.status = 'SENDING';

        return $http.put($rootScope.createGetUrl('valuation-by-landlord/send-all/start/index'),  {})
          .then(function (_) {

            var chain = $q.when();

            landlordsToSend.slice(0, 2).forEach(function (laondlord) {
              $log.info('sendAll for laondlord: ', laondlord);
              chain = chain.then(function() {
                $log.info('sendAll send: ', laondlord);
                return sendEmail.send(year, laondlord, sending)
                  .catch(function (err) {
                    $log.error('sendAll send err: ', err);
                  });
              });
            });

            return chain;
            //return {};
          });
      }


      return sendAll;

    }]);
