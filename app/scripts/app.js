'use strict';

angular.module('pms3App', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/viewProperty', {
        templateUrl: 'views/viewProperty.html',
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
      .when('/viewContact', {
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

      //$rootScope.hostname = window.location.hostname;


      $rootScope.clearError = function() {
        $rootScope.error = '';
      }

      $rootScope.$on('$routeChangeStart', function (evt, cur, prev) {
        $log.info('$routeChangeStart...' + $location.path() + ' userProfile:' + angular.toJson($rootScope.userProfile));

//        if(!authService.authenticated()) {
//          $log.info('no username... forwarding to login' + $rootScope.userProfile.username);
//          $location.path('/login');
//          return;
//        }

        $log.info('$routeChangeStart good to go:' + ' userProfile.surname:' + $rootScope.userProfile.surname);

      });

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
