'use strict';

angular.module('pms3App')
  .controller('HistoryCtrl', ['$scope', 'historyService', function ($scope, historyService) {

    historyService.load($scope);

  }]);
