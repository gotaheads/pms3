'use strict';

angular.module('pms3App')
  .controller('TopMenuCtrl', function ($scope) {
    var $log = $scope.$log;
    var $location = $scope.$location;
    $scope.topMenu = [];
    $scope.showMenu = true;
    function create(label, path, menuItem) {
      return {label:label, path:path, menuItem:menuItem};
    }

    var topMenu = [];
    function crateTopMenu() {
      topMenu = [];
      topMenu.push(create('Dashboard', '/dashboard'));
      topMenu.push(create('Valuation Report', '/valuations-by-landlord/select/'+$scope.year(), '/valuation'));
      topMenu.push(create('Clients\' Properties', '/client/properties/'+$scope.year(), '/client'));
      topMenu.push(create('Town Suburbs', '/town-suburbs'));
      //topMenu.push(create('Contact', '/contact/view'));
      return topMenu;
    }

    function activate() {
      var current = $location.path();
      //$log.info('TopMenuCtrl $routeChangeStart...current: ' + current);

      topMenu.forEach(function(item) {
        var menuItem = (!!item.menuItem?item.menuItem:item.path);
        item.active = (current.indexOf(menuItem) != -1?true:false);
      });

      if(current === '/history') {
        $scope.showMenu = false;
      }


      switch(current) {
        case '/':
          break;
      }
    }

    $scope.$on('$routeChangeStart', function (evt, cur, prev) {
      if(!$scope.authenticated()) {
        $scope.forward('/login');
        return;
      }

      if(!!cur.$$route && cur.$$route.originalPath === '/login') {
        $scope.topMenu = [];
        return;
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
