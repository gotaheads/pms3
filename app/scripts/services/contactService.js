'use strict';
function jsonp_callback(data) {
  // returning from async callbacks is (generally) meaningless
  console.log(data);
  angular.element('#app-container').scope().contacts = data.parties;
  //angular.element(document).injector().get('contactService').contacts = data.parties;

}


//function MyCtrl($scope, $http) {
//  $scope.name = 'Superhero';
//  var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=jsonp_callback";
//
//  $http.jsonp(url).then(
//    function(s) { $scope.success = JSON.stringify(s); },
//    function(e) { $scope.error = JSON.stringify(e); } );
//}

//function jsonp_callback(data) {
//  var el = document.getElementById('ctl');
//  var scope = angular.element(el).scope();
//    scope.$apply(function() {
//    scope.data = JSON.stringify(data);
//  });
//}
//function jsonp_callback(data) {
//  var el = document.getElementById('ctl');
//  var scope = angular.element(el).scope();
//    scope.$apply(function() {
//    scope.data = JSON.stringify(data);
//  });
//}

angular.module('pms3App')
  .service('contactService', ['$log', '$http','$rootScope',
    function contactService($log, $http,$rootScope) {
      this.contacts;

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

        this.loadproxy($scope)
          .then(function(data) {
          $log.info('loaded data: ' + data);
        });


//        $http.get('/restlet/user-profile/' + 'admin').success(function (up) {
//          //$rootScope.userProfile = up;
//          $log.info('loaded data: ' + up);
//        });
      }

  }]);
