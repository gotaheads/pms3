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
    $scope.landlordNames = [];
    $scope.sending = {
      test: true,
      overviewLink: 'https://portfolioms-my.sharepoint.com/:b:/g/personal/valuations_portfolioms_com_au/EectJUKYt9tGs3kXhoXgPUUB_uGxo9wFqkHSHQhcHbMPdA?e=dgTE4C',
      // content:'Please click below link and download our market overview and your portfolio\'s market appraisal for the financial year ending June 30, 2017.\n' +
      // '\n' +
      // 'Due to client feedback, we are delivering these to you via emails. Should you prefer a hard copy of your appraisal, we will be happy to send it out in the same manner as previous years.\n' +
      // '\n' +
      // 'Over the coming months we will be in touch to discuss your property assets further, however please feel free to request a call sooner.',
      content: '<p>Dear {{name}},</p>\n' +
      '<p>' +
      "Please download our market overview and your portfolio's market appraisal for the financial year ending June 30, {{year}}." +
      '</p>\n' +
      '<p>' +
      'Due to client feedback, we are delivering these to you via emails. Should you prefer a hard copy of your appraisal, we will be happy to send it out in the same manner as previous years.' +
      '</p>\n' +
      '<p>' +
      'Over the coming months we will be in touch to discuss your property assets further, however please feel free to request a call sooner.' +
      '</p>\n' +
      '<a href=\'{{sharingLink}}\'>Click here to view your valuation report.</a><br>\n' +
      '<a href=\'{{overviewLink}}\'>Click here to view PMS market overview.</a>\n'
    }

    reportService.loadSelection($scope);

    $scope.selectedLandlordId = '';

    $scope.selectLandlord = function ($item, $model, $label, $event) {
      $scope.selectedLandlordId = $item;
      $scope.selectedLandlord = $scope.landlords[$item];
      $log.info('selectLandlord selectedLandlordId: ', $scope.selectedLandlordId,
        ', selectedLandlord: ', $scope.selectedLandlord
      );
      $scope.requireLandlord = false;
    }

    valuationService.isAuthenticated().then(authenticated => {
      $log.info('SelectValuationsByLandlordCtrl authenticated: ', authenticated)
      $scope.authenticated = authenticated;
    })

    $scope.pdf = function(year, number) {
      $log.info('SelectValuationsByLandlordCtrl.pdf year: ', year, ', number: ', number);
      valuationService.pdf(year, number).then(url => {
        $log.info('SelectValuationsByLandlordCtrl.pdf url: ', url)
        window.location.href = url;
      }).catch(function (err) {
        $scope.authenticated = false;
      });
    };

    $scope.emailTest = function(year, number, name) {
      $log.info('SelectValuationsByLandlordCtrl.emailTest year: ', year, ', number: ', number, ', name: ', name);
      valuationService.emailTest(year, number, name).then(url => {
        $log.info('SelectValuationsByLandlordCtrl.emailTest url: ', url)
        alert('test email has been sent.');
      }).catch(function (err) {
        $scope.authenticated = false;
      });
    };

    $scope.send = function(year) {
      $log.info('SelectValuationsByLandlordCtrl.send year: ', year,
        ', selectedLandlordId: ', $scope.selectedLandlordId,
        ', selectedLandlord: ', $scope.selectedLandlord,
        ', sending: ', $scope.sending,
        );

      if(!$scope.selectedLandlord) {
        $scope.requireLandlord = true;
        return;
      }

      valuationService.emailTest2(year, $scope.selectedLandlord, $scope.sending).then(url => {
        $log.info('SelectValuationsByLandlordCtrl.send url: ', url)
        alert('test email has been sent.');

      }).catch(function (err) {
        $scope.authenticated = false;
      });
    };

    $scope.sendAll = function(year) {
      $log.info('SelectValuationsByLandlordCtrl.sendAll year: ', year,
      );
    }

  }]);
