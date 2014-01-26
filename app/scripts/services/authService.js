'use strict';

angular.module('pms3App')
  .service('authService', ['$log', '$http','$rootScope',
  function authService($log, $http, $rootScope) {
    $rootScope.userProfile = {};

    var createGet = function(service) {
      return $rootScope.createGet(service);
//      var url = '/coldfusion/pms3service/' + service + '.cfm';
//      return $http.get(url);
    }

    this.auth= function(userProfile) {
      var url = '/coldfusion/pms3service/auth.cfm';
      return $http.post(url, userProfile);
    }

    this.isValid = function($scope) {
      var url = '/coldfusion/pms3service/is-valid.cfm';
      return $http.get(url);
    }

    this.authenticated = function() {
      return !!$rootScope.userProfile.username;
    }

    this.logout = function() {
      $rootScope.userProfile = {};

      createGet('logout').then(function(data) {
        $log.info('logout done...');
        $rootScope.forward('/login');
      });

    }

    var load = function(userProfile) {
      $rootScope.userProfile = userProfile;
      return $rootScope.userProfile;
    }

    this.loadUserProfile = function($scope) {
      $scope.userProfile = {};

      createGet('user-profile/load').then(function(data) {
        var userProfile = load(data.data.userProfile);
        $log.info('loadUserProfile loaded: ' + angular.toJson(userProfile) + ' ');

        if(!userProfile.username) {
          $rootScope.forward('/login');
        }

      });
    }

    this.authenticate2 = function(toValidate) {
      this.auth(toValidate)
        .then(function(data) {
          $log.info('authenticate2 : ' + angular.toJson(data));
          var userProfile = load(data.data.userProfile);
          userProfile = (!userProfile?{}:userProfile);
          if(!userProfile.username) {
            $rootScope.error = 'Invalid login, please try again.';
            return;
          }
          $rootScope.forward('/');
        });

    }

    this.authenticate = function(userProfile) {
      var url =  $rootScope.createRestPath('auth.cfc?method=authenticate&callback=?');
      //var url = 'http://d361253.u161.fasthit.net/coldfusion/pms3service/auth.cfc?method=authenticate&callback=?';

      $.post(url, userProfile, function(data, textStatus, jqXHR) {

        $log.info('authenticate result: ' + data);

        data = data.substring(2, data.length - 1);

        $log.info('post data: ' + data);

        var res = $.parseJSON(data);



        var user = res.DATA[0];
        var userProfile = {};

        userProfile.firstName = user[3];
        userProfile.surname = user[4];

        //userProfile.valid = true;

        if(!userProfile.surname) {
          $log.info('authenticate. userProfile.surname not found! ');
          return;
        }

        $log.info('userProfile created: ' + angular.toJson(userProfile));

        $rootScope.userProfile = userProfile;

        $rootScope.forward('/');

        $rootScope.$apply();
      });

//      $.getJSON(url, function(data) {
//        var res = 'Name: '+data.DATA[0][1]+' ';
//        $log.info('jsonp: ' + res)
//      })

//      $http.jsonp(url).success(function(data, status, headers, config) {
//        $log.info('authenticated: up ' + angular.to(data));
//      });

    }

  }]);
