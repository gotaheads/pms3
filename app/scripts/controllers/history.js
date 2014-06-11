'use strict';

angular.module('pms3App')
  .controller('HistoryCtrl', ['$scope', 'historyService', function ($scope, historyService) {

    historyService.load($scope);

    $scope.upload = function() {
      historyService.upload($scope);
    }
    $scope.save = function() {
      historyService.save($scope);

    }
  }]);
