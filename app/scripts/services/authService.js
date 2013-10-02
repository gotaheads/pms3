'use strict';

angular.module('pms3App')
  .service('authService', ['$log', '$http',
  function authService($log, $http) {

    this.authenticate = function(userProfile) {
      var url = 'http://d361253.u161.fasthit.net/coldfusion/pms3service/auth.cfc?method=authenticate&callback=?';

      $.getJSON(url, function(data) {
        var res = 'Name: '+data.DATA[0][1]+' ';
        $log.info('jsonp: ' + res)
      })

//      $http.jsonp(url).success(function(data, status, headers, config) {
//        $log.info('authenticated: up ' + angular.to(data));
//      });

    }

  }]);
