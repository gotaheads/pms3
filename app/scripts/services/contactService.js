'use strict';

angular.module('pms3App')
  .service('contactService', ['$log', '$http','$rootScope',
    function contactService($log, $http,$rootScope) {
      var contacts;

      var url =  $rootScope.createRestPath('contact/load.cfc?method=load&callback=jsonp_callback');

      $rootScope.$watch('contacts', function() {
        $log.info('contacts loaded: ' + $rootScope.contacts);
      });

      this.load = function() {
        $log.info('loading contacts ');

        $http.jsonp(url).success(function(data, status, headers, config) {
          $log.info('load data: ' + data);
        });
      }

      this.loadj = function($scope) {
        $log.info('loading contacts j');

        var url =  $rootScope.createRestPath('contact/load.cfc?method=load&callback=jsonp_callback');

        $.getJSON(url, function(data) {
          //$log.info('load data: ' + data);
          data = data.substring(2, data.length - 1);
          $log.info('loaded data: ' + data);
          var res = $.parseJSON(data);
          data.parties;
          $log.info('loaded : ');// + angular.toJson(userProfile)

        });
      }

      this.loadproxy = function($scope) {
        //http://d361253.u161.fasthit.net
        // /coldfusion/pms3service/contact/load-contacts.cfm
        // /coldfusion/pms3service/load-contacts.cfm
        var url = '/coldfusion/pms3service/contact/load-contacts.cfm';
        return $http.get(url);
      }

      this.findOrCreate = function($scope) {
        //this.load();
        //this.loadj($scope);
        $scope.limitTo=100;
        $scope.loading = false;
        $scope.date = function(date) {
          return new Date(date);
        }
        if(contacts) {
          $scope.contacts = contacts;
          return;
        }

        $scope.loading = true;
        this.loadproxy($scope)
          .then(function(data) {
          contacts = (data.data.parties.person);

//          contacts.forEach(function(p) {
//          });
          var c = contacts[1];
          $log.info('loaded data: ' + contacts.length + ' ' +  angular.toJson(contacts[1]) +
                    ' ' + c.contacts.email.emailAddress);
          $scope.contacts = contacts;

          $scope.loading = false;
        });
      }

  }]);
