'use strict';

angular.module('pms3App')
  .service('contactService', ['$log', '$http','$rootScope',
    function contactService($log, $http,$rootScope) {
      var contacts;
      var limitTo = 20;

//      var url =  $rootScope.createRestPath('contact/load.cfc?method=load&callback=jsonp_callback');
//
//      $rootScope.$watch('contacts', function() {
//        $log.info('contacts loaded: ' + $rootScope.contacts);
//      });
//
//      this.load = function() {
//        $log.info('loading contacts ');
//
//        $http.jsonp(url).success(function(data, status, headers, config) {
//          $log.info('load data: ' + data);
//        });
//      }
//
//      this.loadj = function($scope) {
//        $log.info('loading contacts j');
//
//        var url =  $rootScope.createRestPath('contact/load.cfc?method=load&callback=jsonp_callback');
//
//        $.getJSON(url, function(data) {
//          //$log.info('load data: ' + data);
//          data = data.substring(2, data.length - 1);
//          $log.info('loaded data: ' + data);
//          var res = $.parseJSON(data);
//          data.parties;
//          $log.info('loaded : ');// + angular.toJson(userProfile)
//
//        });
//      }

      this.loadproxy = function($scope) {
        var url = '/coldfusion/pms3service/contact/load-contacts.cfm';
        return $http.get(url);
      }

      function contains(check, filtering) {
        for(var i = 0; i < check.length; i++) {
          var c = check[i];
          if(!c) {
            return false;
          }
          if(c.toLowerCase().indexOf(filtering) !== -1) {
            return true;
          }
        }
        return false;
      }
      var filter = function(toFilter,filtering) {

        if(!filtering) {
          return toFilter;
        }
        var filtered = [];

        for(var i = 0; i < toFilter.length; i++) {
          var c = toFilter[i];
          var check = [];
          check.push(c.firstName);
          check.push(c.lastName);
          //check.push(c.contacts.email.emailAddress);
          if(contains(check, filtering)) {
            filtered.push(c);
          }

        }

        return filtered;
      };


      this.findOrCreate = function($scope) {
        //this.load();
        //this.loadj($scope);
        $scope.limitTo=limitTo;
        $scope.loading = false;
        $scope.canLoad = false;
        $scope.total = 0;
        $scope.missingEmail = 0;
        $scope.missingPhone = 0;

        $scope.loadNext = function() {
          var newValue = $scope.limitTo + limitTo;
          if(newValue <= contacts.length) {
            $scope.limitTo = newValue;
          }
        }

        $scope.date = function(date) {
          return new Date(date);
        }

        $scope.filtering = '';

        $scope.filter = function() {
          var filtering = $scope.filtering;
          $log.info('filtering : ' +filtering);
          $scope.contacts = filter(contacts, filtering);
        }

        if(contacts) {
          $scope.contacts = contacts;
          return;
        }

        $scope.loading = true;


        $rootScope.createGet('pms-contact/load').then(function(data) {
          $log.info('propertyService pmsContact found');
          var pmsContact = $scope.rests.convertItems(data.data);
          $log.info('propertyService pmsContact transformed');
          $scope.pmsContact = pmsContact;
          $log.info('propertyService pmsContact populated: ' + pmsContact.length);
        });

        this.loadproxy($scope)
          .then(function(data) {
          contacts = (data.data.parties.person);
          var c = contacts[1];
          $log.info('loaded data: ' + contacts.length + ' ' +  angular.toJson(contacts[1]) +
                    ' ');

          contacts.forEach(function(c) {
            if(!c.contacts.email) {
              $scope.missingEmail += 1;
            }
            if(!c.contacts.phone) {
              $scope.missingPhone += 1;
            }

          });
          $scope.total = contacts.length;
          $scope.contacts = contacts;
          $scope.loading = false;
          if(contacts.length > limitTo) {
            $scope.canLoad = true;
          }



        });


      }

  }]);
