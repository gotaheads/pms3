'use strict';

angular.module('pms3App')
  .service('historyService', ['$http', '$log', function historyService($http, $log) {
    var historyService = {};
    var contacts = [];
    var added = [];
    var contactIds = {};

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

          if(!contact.notes) {
            contact.notes = [];
          }
          contact.notes.push(d);

          if(!_.contains(added, id)) {
            contacts.push(contact);
            added.push(id);
          }

          return d;
        })
        .get(function(error, rows) {
          $log.info('contact with history  created ' + contacts.length);

          $log.info('history created ');

          $scope.$apply();
        });


    }

    return historyService;


  }]);
