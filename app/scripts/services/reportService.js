'use strict';

angular.module('pms3App')
  .service('reportService', ['$location', '$log', '$routeParams', 'valuations', 'valuationsByLandlord',
    function reportService($location, $log, $routeParams, valuations, valuationsByLandlord) {
      $log.info('start reportService ');

      var reportService = {}, batchSize = 30,
        today = Date.today(),
        current = parseInt(today.toString('MMdd')),
        year = parseInt(today.toString('yyyy')),
        year = (current > 630 ? year : year - 1),
        years = [];
      for (var i = 2006; i < year; i++) {
        years.push(i);
      }
      $log.info('current ' + current + ' year ' + year);

      reportService.years = function () {
        return years;
      }
      reportService.year = function () {
        return year;
      }
      reportService.batchSize = function () {
        return batchSize;
      }
      reportService.loadActions = function (clientCount, batchSize) {
        var actions = [];
        var batch = Number(batchSize),
          times = clientCount / batch;
        var no = 0;
        var from = 1;
        var to = batch;
        for (var i = 0; i < times; i++) {
          no = i + 1;
          actions.push({batch: i, no: no, from: from, to: to});
          from = to + 1;
          to += batch;
          to = (to < clientCount ? to : clientCount);
        }
        return actions;
      }

      reportService.loadSelection = function ($scope) {
        $log.info('reportService :' + $scope.year);

        return $scope.createGet('valuation-by-landlord/select/',
          'year=' + $scope.year).then(function (data) {

          var d = data.data;
          var propertyCount = $scope.rests.convertItems(d.propertyCount)[0].count,
            marketValueCount = $scope.rests.convertItems(d.marketValueCount)[0].count,
            clientCount = $scope.rests.convertItems(d.clientCount)[0].count,
            clients = $scope.rests.convertItems(d.clients),
            emailContent = $scope.rests.convertItems(d.emailContent)[0];


          $scope.propertyCount = propertyCount;
          $scope.clientCount = clientCount;
          $scope.marketValueCount = marketValueCount;
          $scope.actions = reportService.loadActions(clientCount, batchSize);
          $scope.batchSize = batchSize;
          $scope.clients = [];
          var landlordNames = $scope.landlordNames = [];
          var landlords = $scope.landlords = [];
          var landlordsToSend = $scope.landlordsToSend = [];
          $scope.actions.forEach(function (a) {
            $scope.clients[a.batch] = clients.slice(a.from - 1, a.to);
            $scope.clients[a.batch].forEach(function (c) {
              var unique = c.name + ' (' + c.code + ')';
              c.id = unique;
              $scope.landlordNames.push(unique);
              $scope.landlords[unique] = c;

              if (!c.sent) {
                $scope.landlordsToSend.push(c);
              }

            })

          });

          $scope.sending.content = emailContent.content;
          $scope.sending.overviewLink = emailContent.overviewlink;
          $scope.sending.test = emailContent.test;
          $scope.sending.status = findStatus(emailContent);
          $scope.sending.startBy = emailContent.startby;

          $scope.countSent = $scope.landlordNames.length - $scope.landlordsToSend.length;
          $scope.countToSend = $scope.landlordNames.length - $scope.countSent;

          $scope.sendAllStatus = {
            startAt: emailContent.startat,
            sending:null,
            landlords: [],
            countSent: $scope.countSent,
            countToSend: landlordsToSend.length,
            countLoandlods: landlordNames.length,
          }

          $scope.activeTab = {ALL: false, PREVIEW: false};
          switch ($scope.sending.status) {
            case 'TO_SEND':
              $scope.activeTab.PREVIEW = true;
              break;
            case 'SENDING':
              $scope.activeTab.ALL = true;
          }


          $log.info('valuations transformed');
          return $scope.sending;
        });

      }

      function findStatus(emailContent) {
        var started = emailContent.startat != null;

        return started ? 'SENDING' : 'TO_SEND';
      }


      reportService.load = function ($scope) {
        var number = $routeParams.number;
        var year = $routeParams.year;
        $scope.year = year;
        $log.info('reportService number:' + number + ' ' + year);

        $scope.createGet('valuation-by-landlord/',
          'number=' + number + '&year=' + year).then(function (data) {
          valuationsByLandlord.load($scope, data.data, year);
        });


      }
      return reportService;

    }]);
