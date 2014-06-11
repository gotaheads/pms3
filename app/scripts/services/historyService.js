'use strict';

angular.module('pms3App')
  .service('historyService', ['$http', '$log', function historyService($http, $log) {
    var historyService = {};
    var notes = [];
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
    var types = {1:'Email',
    2:'Letter', 4:'Phone',10:'Meeting',11:'Facsimile'};
    var removing = [];
    var no = 35;

    historyService.save =  function($scope) {
      var csvWin = window.open("","",""),
        val = '';
      $scope.removing.forEach(function(c) {
        val += 'curl -u 4d002871e127fd558f7761bccf2858e4:x -i -X DELETE https://portfolioms.capsulecrm.com/api/history/' + c.id + ' 0x0A'
      });
      csvWin.document.write('<meta name="content-type" content="text/csv">');
      csvWin.document.write('<meta name="content-disposition" content="attachment;  filename=data.csv">  ');
      csvWin.document.write(val);

//      File.save('abc', function (content) {
//        var hiddenElement = document.createElement('a');
//
//        hiddenElement.href = 'data:attachment/txt,' + encodeURI(content);
//        hiddenElement.target = '_blank';
//        hiddenElement.download = 'remove-curl.sh';
//        hiddenElement.click();
//      });
    }

    historyService.load =  function($scope) {
      d3.json("data/history-remove"+no+".json",function(error, json){
          $log.info('json data row ' + angular.toJson(json));
          $scope.removing = json.history.historyItem;
          $scope.$apply();

      });
//        .row(function(d) {
//          //$log.info('csv data row ' + angular.toJson(d));
//          var id = d['Member ID'];
//          d.id = d.ID;
//
//          removing.push(d);
//          return d;
//        })
//        .get(function(error, rows) {
//          $scope.removing = removing;
//          $scope.$apply();
//        });

      d3.csv("data/contacts.csv")
        .row(function(d) {
          //$log.info('csv data row ' + d['ID']          );
          var id = d['Member ID'];
          d.id = d.ID;
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
          //$log.info('csv data row ' + d['fldContactID']);
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
          d.type = types[d.ContactTypeID];
          d.memberId = contact.id;

          notes.push(d);

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
          $scope.notes = notes;
          $scope.$apply();
        });


    }

    return historyService;


  }]);
