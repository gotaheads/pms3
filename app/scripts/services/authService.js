'use strict';

angular.module('pms3App')
  .service('authService', ['$log', '$http',
  function authService($log, $http) {

    //http://stackoverflow.com/questions/8932973/how-to-post-json-data-to-remote-api-using-coldfusion-cfhttp
    //http://www.bennadel.com/blog/2207-Posting-JSON-Data-To-The-ColdFusion-Server-Using-jQuery.htm
    //http://stackoverflow.com/questions/9009794/get-coldfusion-to-parse-a-json-request
    //http://stackoverflow.com/questions/8737845/json-response-using-cfscript-function
    //http://stackoverflow.com/questions/9642717/displaying-coldfusion-json-response-with-jquery

    this.loadUserProfile = function($scope) {

    }

    this.authenticate = function(userProfile) {
      var url = 'http://d361253.u161.fasthit.net/coldfusion/pms3service/auth.cfc?method=authenticate&callback=?';

      $.post(url, userProfile, function(data, textStatus, jqXHR) {

        $log.info('post data: ' + data);

        data = data.substring(2, data.length - 1);

        $log.info('post data: ' + data);

        var res = $.parseJSON(data);

        var user = res.DATA[0];
        var userProfile = {};

        userProfile.firstName = user[3];
        userProfile.surame = user[4];


        $log.info('userProfile : ' + angular.toJson(userProfile));

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
