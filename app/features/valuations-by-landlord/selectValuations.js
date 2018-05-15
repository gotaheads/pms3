'use strict';

angular.module('pms3App')
  .controller('SelectValuationsByLandlordCtrl',
    ['$scope', '$routeParams', 'reportService', 'valuationService',
  function ($scope, $routeParams, reportService, valuationService) {
    var $log = $scope.$log,
      year = ($routeParams.year);
    $scope.year = year,
    $scope.years = reportService.years(),
    $scope.bulk = reportService.batchSize();

    reportService.loadSelection($scope);

    // $scope.update = function(val) {
    //   $log.info('' + $scope.clients +' '+ $scope.bulk + ' val' + val);
    //   $scope.actions = reportService.loadActions($scope.clients, val);
    // };

    valuationService.isAuthenticated().then(authenticated => {
      $log.info('SelectValuationsByLandlordCtrl authenticated: ', authenticated)
      $scope.authenticated = authenticated;
    })

    $scope.pdf = function(year, number) {
      $log.info('SelectValuationsByLandlordCtrl year: ', year, ', number: ', number);
      valuationService.pdf(year, number).then(url => {
        $log.info('SelectValuationsByLandlordCtrl url: ', url)
        window.location.href = url;
      }).catch(function (err) {
        $scope.authenticated = false;
      });
    };

  }]);
