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
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$rootScope', '$location', '$log', '$filter', '$http',
    'authService',
    function ($rootScope, $location, $log, $filter, $http,
              authService) {
      $rootScope.location = $location;
      $rootScope.$log = $log;
      $rootScope.userProfile = {};

      $rootScope.createRestPath = function(context) {
        return $rootScope.restPath + context;
      }
      $rootScope.restPath = 'http://d361253.u161.fasthit.net/coldfusion/pms3service/';

//        $rootScope.capitalize = $filter('capitalize');
//        $rootScope.browser = BrowserDetect.browser;
//        $rootScope.browserVersion = BrowserDetect.version;
//        $rootScope.browserOS = BrowserDetect.OS;
        $rootScope.hostname = window.location.hostname;

      $log.info('myApp hostname: ' + $rootScope.hostname);
      $log.info('myApp path: ' + $rootScope.location.path());

      authService.loadUserProfile($rootScope);

      $rootScope.loadUserProfile = function () {
        $rootScope.userProfile = {name: 'Jock Bing', dateLogin: new Date()};
      }

      $rootScope.loadUserProfile();

      $rootScope.$on('$routeChangeStart', function (evt, cur, prev) {
        $log.info('$routeChangeStart...' + $location.path());
      });

      $rootScope.logout = function () {
        $log.info('logout...');
        $location.path('/login');
      };

      $rootScope.forward = function (path) {
        $location.path(path);
      }
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
