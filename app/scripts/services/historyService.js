'use strict';

angular.module('pms3App')
  .service('historyService', ['$http', '$log', function historyService($http, $log) {
    var historyService = {};
    var contacts = [];
    var added = [];
    var contactIds = {};
    var countHistory = 0;

    historyService.upload =  function($scope) {
      contacts.forEach(function(c) {
        $scope.uploading = c;
        $log.info('uploading ' + c.ID);
        c.notes.forEach(function(n) {
          var id = c.ID,
            id = 47416848,
            note = n.Comments,
            date = n.ContactDate,
            parts = date.split('/'),
            url = 'https://portfolioms.capsulecrm.com/api/party/'+id+'/history',
            data = {"historyItem": {"entryDate":"2014-06-09T12:30:00Z","note": note}};
          //data = '{"historyItem": {"entryDate":"2014-06-09T12:30:00Z","note": "test note!"}}';

          $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            data: data,
            success: function() {
              $log.info('history created ');
            },
            beforeSend: function (xhr) {
              xhr.withCredentials = true;
              xhr.setRequestHeader("Content-Type","application/json");
              xhr.setRequestHeader("Accept","application/json");
              xhr.setRequestHeader ("Authorization", "Basic "+btoa('6b79d86bcf4b09d8c1bf005f986c2844:x'));
            }
          });
          throw BreakException;

        });
      });

    }

    historyService.load =  function($scope) {
      d3.csv("data/contacts.csv")
        .row(function(d) {
          //$log.info('csv data row ' + angular.toJson(d));
          var id = d['Member ID'];
          contactIds[id] = d;
          //contacts.push(d);
          return d;
        })
        .get(function(error, rows) {
          $scope.contacts = contacts;
          $scope.$apply();
        });
      d3.csv("data/contact-history.csv")
        .row(function(d) {
          //$log.info('csv data row ' + angular.toJson(d));
          var id = d.MemberID,
            contact = contactIds[id];
          if(!contact) {
            return d;
          }

          var date = d.ContactDate,
              parts = date.split('/');
          d.y = parts[2],
          d.m = parts[1],
          d.d = parts[0];
          if(!contact.notes) {
            contact.notes = [];
          }
          contact.notes.push(d);
          countHistory++;
          if(!_.contains(added, id)) {
            contacts.push(contact);
            added.push(id);
          }

          return d;
        })
        .get(function(error, rows) {
          $log.info('contact with history  created ' + contacts.length);

          $log.info('history created ');
          $scope.countHistory =countHistory;
          $scope.$apply();
        });


    }

    return historyService;


  }]);
