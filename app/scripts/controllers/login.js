'use strict';

angular.module('pms3App')
  .controller('LoginCtrl', ['$scope', 'authService',
  function ($scope, authService) {
    var $log = $scope.$log;

    $scope.userProfile = {username:'',password:''};

    $scope.login = function() {
      $log.info('login: ' + $scope.userProfile.username);
      $scope.clearError();
      authService.authenticate2($scope.userProfile);


    }

//    var surl = 'http://d361253.u161.fasthit.net/coldfusion/pms3service/auth.cfc?method=authenticate&callback=?'
//    surl = 'http://d361253.u161.fasthit.net/coldfusion/pms3service/auth.cfc?method=authenticate&callback=?';
//    $.getJSON(surl, function(data) {
//      var res = 'Name: '+data.NAME+' '
//      res += 'Age: '+data.AGE+' '
//      res += 'Suaveness: '+data.SUAVENESS
//      //if(data.SUAVENESS > 100) res+=' (Rico-worthy)'
//
//      $log.info('jsonp: ' + res)
//    })




  }]);
