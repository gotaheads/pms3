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

    this.loadPersisted = function() {
      var u = $rootScope.$storage.userProfile;
      return (!!u?u:{});
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
      $rootScope.$storage.userProfile = {};

      createGet('logout').then(function(data) {
        $log.info('logout done...');
        $rootScope.forward('/login');
      });

    }

    var load = function(userProfile) {
      $rootScope.userProfile = userProfile;
      $rootScope.$storage.userProfile = $rootScope.userProfile;
      return $rootScope.userProfile;
    }

    this.loadUserProfile = function($scope) {
      if(!!this.loadPersisted()) {
        $scope.userProfile = this.loadPersisted();
        $log.info('loadUserProfile found in storage: ' +
          angular.toJson($scope.userProfile) + ' ');
        return;
      }

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


  }]);
