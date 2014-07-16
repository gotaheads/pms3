'use strict';

angular.module('pms3App')
  .service('rests', ['$http', '$rootScope',
  function rests($http, $rootScope) {

    this.get = function(service, param) {
      var token = $rootScope.token;
      var url = '/coldfusion/pms3service/' + service
        +(service.endsWith('/')?'':'.cfm')
        +'?token='+token+(param?'&'+param:'');
      $log.info('createGet url: ' + url);
      return $http.get(url);
    }

    this.post = function(service, data) {
      var url = '/coldfusion/pms3service/' + service
        + (service.endsWith('/')?'':'.cfm');

      return $http.post(url, data);
    }

    this.convertItems = function(data) {
      var props = data.COLUMNS;
      var rows = data.DATA;
      var items = [];
      for(var ri = 0; ri < rows.length; ri++) {
        var values = rows[ri];
        var item = {};
        for(var i = 0; i < props.length; i++) {
          var prop = props[i].toLowerCase();
          item[prop] = values[i];
        }
        items.push(item);
      }
      return items;

    }

    this.convertItem = function(data) {
      var props = data.COLUMNS;
      var values = data.DATA[0];
      var property = {}
      for(var i = 0; i < props.length; i++) {
        var prop = props[i].toLowerCase();
        property[prop] = values[i];
      }
      return property;
    }
  }]);
