'use strict';

angular.module('pms3App')
  .service('authService', ['$log', '$http','$rootScope',
  function authService($log, $http, $rootScope) {

    //http://stackoverflow.com/questions/8932973/how-to-post-json-data-to-remote-api-using-coldfusion-cfhttp
    //http://www.bennadel.com/blog/2207-Posting-JSON-Data-To-The-ColdFusion-Server-Using-jQuery.htm
    //http://stackoverflow.com/questions/9009794/get-coldfusion-to-parse-a-json-request
    //http://stackoverflow.com/questions/8737845/json-response-using-cfscript-function
    //http://stackoverflow.com/questions/9642717/displaying-coldfusion-json-response-with-jquery
    this.isValid = function($scope) {
      //http://d361253.u161.fasthit.net
      // /coldfusion/pms3service/contact/load-contacts.cfm
      // /coldfusion/pms3service/load-contacts.cfm
      var url = '/coldfusion/pms3service/is-valid.cfm';
      return $http.get(url);
    }

    this.loadUserProfile = function($scope) {
      this.isValid().then(function(data) {
        $log.info('isValid: ' + angular.toJson(data.data) + ' ' + data.data.valid);
        var valid = data.data.valid;



      });

    }

    this.load= function(userProfile) {
      var url = '/coldfusion/pms3service/auth.cfm';
      return $http.post(url, userProfile);
    }

    this.authenticate2 = function(toValidate) {
      this.load(toValidate)
        .then(function(data) {
          $log.info('authenticate2 : ' + angular.toJson(data));
          var userProfile = data.data.userProfile;
          userProfile = (!userProfile?{}:userProfile);
          if(!userProfile.username) {
            $rootScope.error = 'Invalid login, please try again.';
            return;
          }
          $rootScope.userProfile = userProfile;
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

      this.logout = function() {
        $rootScope.userProfile = {};

        $rootScope.forward('/login');
      }

//      $.getJSON(url, function(data) {
//        var res = 'Name: '+data.DATA[0][1]+' ';
//        $log.info('jsonp: ' + res)
//      })

//      $http.jsonp(url).success(function(data, status, headers, config) {
//        $log.info('authenticated: up ' + angular.to(data));
//      });

    }

  }]);
