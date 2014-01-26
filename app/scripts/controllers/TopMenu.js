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
      topMenu.push(create('Dashboard', '/'));

      topMenu.push(create('Property', '/'));
      return topMenu;
    }

    $scope.$on('$routeChangeStart', function (evt, cur, prev) {
      var current = $location.path();
      $log.info('TopMenuCtrl $routeChangeStart...current: ' + current);
      topMenu.forEach(function(item) {
        item.active = (current==item.path?true:false);
      });
      switch(current) {
        case '/':
          break;
      }

    });

    $scope.$watch('userProfile', function() {
      $log.info('TopMenuCtrl userProfile changed: ' + $scope.userProfile.username);
      $scope.topMenu = ($scope.authenticated()?crateTopMenu():[]);
    });
  });
