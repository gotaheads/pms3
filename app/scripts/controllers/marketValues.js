'use strict';

angular.module('pms3App')
  .controller('MarketValuesCtrl', function ($scope, $http, rests) {
  $scope.marketValueCount = 0;
    //    /coldfusion/pms3service/property/market-value/download/index.cfm
  $scope.downloadUrl = rests.createUrl('property/market-value/download/');
  });
