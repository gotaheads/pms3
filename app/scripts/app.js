'use strict';

angular.module('pms3App', [])
  .config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
    var interceptor = ['$rootScope', '$q','$location',
      function (scope, $q, $location) {
        function success(response) {
          var data = response.data;
          return response;
        }
        function error(response) {
          var status = response.status;

          if(response.status === 401 || response.status === 402 || response.status === 403) {
            if(scope.authenticated()) {
              $location.path('/');
            }
            else {
              $location.path('/login');
            }

            return $q.reject(response);
          }
          else{
            return $q.reject(response);
          }

        }
        return function (promise) {
          return promise.then(success, error);
        }
      }];

    $httpProvider.responseInterceptors.push(interceptor);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/view-property', {
        templateUrl: 'views/view-property.html',
        controller: 'ViewPropertyCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/editProperty', {
        templateUrl: 'views/editProperty.html',
        controller: 'EditPropertyCtrl'
      })
      .when('/valuationReport/:code', {
        templateUrl: 'views/valuationReport.html',
        controller: 'ValuationReportCtrl'
      })
      .when('/chartTest', {
        templateUrl: 'views/chartTest.html',
        controller: 'ChartTestCtrl'
      })
      .when('/view-contact', {
        templateUrl: 'views/viewContact.html',
        controller: 'ViewContactCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$rootScope', '$location', '$log', '$filter', '$http',
    'authService',
    function ($rootScope, $location, $log, $filter, $http,
              authService) {
      $rootScope.$location = $location;
      $rootScope.$log = $log;
      $log.info('welcome ');
      $log.info('path: ' + $rootScope.$location.path());

      authService.loadUserProfile($rootScope);

      $rootScope.authenticated = function() {
        return authService.authenticated();
      }


      $rootScope.clearError = function() {
        $rootScope.error = '';
      }

//      $rootScope.$on('$routeChangeStart', function (evt, cur, prev) {
//        $log.info('$routeChangeStart...' + $location.path() + ' userProfile:' + angular.toJson($rootScope.userProfile));
//      });

      $rootScope.logout = function () {
        $log.info('logout...');
        authService.logout();
      };

      $rootScope.forward = function (path) {
        $location.path(path);
        return;
      }

      $rootScope.createRestPath = function(context) {
        return $rootScope.restPath + context;
      }
      $rootScope.restPath = 'http://d361253.u161.fasthit.net/coldfusion/pms3service/';

    }]);

var less = {
  env: "development", // or "production"
  async: false,       // load imports async
  fileAsync: false,   // load imports async when in a page under
  // a file protocol
  poll: 1000,         // when in watch mode, time in ms between polls
  functions: {},      // user functions, keyed by name
  dumpLineNumbers: "comments", // or "mediaQuery" or "all"
  relativeUrls: false // whether to adjust url's to be relative
  // if false, url's are already relative to the
  // entry less file
  //rootpath: ":/a.com/"// a path to add on to the start of every url
  //resource
};
