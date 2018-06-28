'use strict';

angular.module('pms3App')
  .service('getItem', ['$http', '$log', '$q', 'isAuthenticated',
    function getItem($http, $log, $q, isAuthenticated) {
      $log.info('start getItem ');

      var getItem = {}
      ;


      getItem.start = function() {
        $log.info('getItem.start');

        var url = createValuationUrl('/graph');
        // return isAuthenticated.isAuthenticated().then(function(authenticated) {
        //   return authenticated? $http.get(url, { withCredentials: true }) : $q.reject(false);
        // })
        return $http.get(url, { withCredentials: true })
        .then(function (item) {
          console.log('getItem item: ', item);
          return item;
        });
      }


      return getItem;

    }]);
