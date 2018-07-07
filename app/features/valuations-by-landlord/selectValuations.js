'use strict';

angular.module('pms3App')
  .controller('SelectValuationsByLandlordCtrl',
    ['$scope', '$routeParams', '$rootScope',
     'reportService', 'valuationService', 'getItem',
  function ($scope, $routeParams, $rootScope,
            reportService, valuationService, getItem) {
    var $log = $scope.$log,
      year = ($routeParams.year);
    $scope.year = year,
    $scope.years = reportService.years(),
    $scope.bulk = reportService.batchSize();
    $scope.landlordNames = [];
    $scope.sending = {}
    $scope.username = $rootScope.userProfile.username;

    valuationService.isAuthenticated().then(authenticated => {
      $log.info('SelectValuationsByLandlordCtrl authenticated: ', authenticated)
      $scope.authenticated = authenticated;
      return reportService.loadSelection($scope);
    })
    .then(function (sending) {
      if(sending.status === 'SENDING' && $scope.authenticated && $scope.sendAllStatus.countToSend > 0) {

        if (window.confirm('Resume send all?')) {
          return sendAll($scope.year, sending, $scope.landlordsToSend);
        }

        sending.status = 'TO_SEND';

      }
    });

    $scope.selectedLandlordId = '';

    $scope.selectLandlord = function ($item, $model, $label, $event) {
      $scope.selectedLandlordId = $item;
      $scope.selectedLandlord = $scope.landlords[$item];
      $log.info('selectLandlord selectedLandlordId: ', $scope.selectedLandlordId,
        ', selectedLandlord: ', $scope.selectedLandlord
      );
      $scope.requireLandlord = false;
    }

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

    $scope.toHtml = function (content) {
      return !!content?content.replace(/(?:\r\n|\r|\n)/g, '<br>'):'';
    }

    $scope.save = function() {
      $log.info('SelectValuationsByLandlordCtrl.save sending: ', $scope.sending,
      );


      valuationService.saveEmail($scope.sending).then(url => {
        $log.info('SelectValuationsByLandlordCtrl.save url: ', url)
        alert('email has been saved.');
      })
    };

    $scope.testChanged = function() {
      $log.info('SelectValuationsByLandlordCtrl.testChanged sending: ', $scope.sending,
      );

      valuationService.saveEmail($scope.sending).then(url => {
        $log.info('SelectValuationsByLandlordCtrl.save url: ', url)
        alert('test check has been saved.');
      })
    }


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

    $scope.$on('email-status', function(event, sendAllStatus) {
      console.log('email-status sendAll: ', sendAllStatus);
      $scope.sendAllStatus = sendAllStatus;
      $scope.error = '';
    });

    $scope.$on('email-send-error', function(event, sendAllStatus) {
      console.log('email-send-error error: ', sendAllStatus.error);
      $scope.sendAllStatus = sendAllStatus;
      switch (sendAllStatus.error.status) {
        case 401:
          $scope.authenticated = false;
          $scope.error = 'Unable to complete due to an error. please try again.';
      }
    });

    $scope.sendAll = function(year, sending, landlordsToSend) {
      sendAll(year, sending, landlordsToSend);
    }

    function sendAll(year, sending, landlordsToSend) {
      $log.info('SelectValuationsByLandlordCtrl.sendAll year: ', year,
        ', sending: ', sending,
        ', landlordsToSend: ', landlordsToSend.length,
      );

      valuationService.sendAll(year, sending, landlordsToSend, $scope.username, $scope.sendAllStatus).then(sendAllStatus => {
        $log.info('SelectValuationsByLandlordCtrl.sendAll finished sendAllStatus: ', sendAllStatus)
        return reportService.loadSelection($scope);
      }).then(function () {
        alert('emails has been sent.');
      })
      .catch(function (err) {
        $log.info('SelectValuationsByLandlordCtrl.sendAll error: ', err);

        //$scope.authenticated = false;

      });
    }

    $scope.cancelAll = function(year, sending, landlordsToSend) {
      $log.info('SelectValuationsByLandlordCtrl.cancelAll year: ', year,
        ', sending: ', sending,
        ', landlordsToSend: ', landlordsToSend.length,
      );
      valuationService.cancelAll(year, sending, landlordsToSend, $scope.sendAllStatus).then(url => {
        $log.info('SelectValuationsByLandlordCtrl.cancelAll url: ', url)
        return reportService.loadSelection($scope);
      }).then(function () {
        alert('email has been cancelled.');
      })
      //   .catch(function (err) {
      //   $scope.authenticated = false;
      // });


    }

    $scope.tabSelected = function (selected) {
      $log.info('SelectValuationsByLandlordCtrl.tabSelected selected: ', selected,
      );
      $scope.selectedTab = selected;
    }

  }]);
