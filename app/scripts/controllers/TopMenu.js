'use strict';

angular.module('pms3App')
  .controller('TopMenuCtrl', function ($scope) {
    var $log = $scope.$log;
    var $location = $scope.$location;
    $scope.topMenu = [];

    function create(label, path) {
      return {label:label, path:path};
    }

    var topMenu = [];
    function crateTopMenu() {
      topMenu = [];
      topMenu.push(create('Dashboard', '/dashboard'));
      //topMenu.push(create('Property', '/property/view'));
      topMenu.push(create('Contact', '/contact/view'));
      return topMenu;
    }

    function activate() {
      var current = $location.path();
      $log.info('TopMenuCtrl $routeChangeStart...current: ' + current);

      topMenu.forEach(function(item) {
        item.active = (current.indexOf(item.path) != -1?true:false);
      });

      switch(current) {
        case '/':
          break;
      }
    }

    $scope.$on('$routeChangeStart', function (evt, cur, prev) {
      if(!$scope.authenticated()) {
        $scope.forward('/login');
      }
      activate();
    });

    $scope.$watch('topMenu', function() {
      activate();
    });
    $scope.$watch('userProfile', function() {
      $log.info('TopMenuCtrl userProfile changed: ' + $scope.userProfile.username);
      $scope.topMenu = ($scope.authenticated()?crateTopMenu():[]);
    });
  });
