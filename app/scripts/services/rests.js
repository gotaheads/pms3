'use strict';

angular.module('pms3App')
  .service('rests', ['$http', '$rootScope',
  function rests($http, $rootScope) {

    function params(param) {
      var token = $rootScope.token;
      return '?token='+token+(param?'&'+param:'');
    }

    function createUrl(service, param) {
      return '/coldfusion/pms3service/' + service +
        (service.endsWith('/')?'':'.cfm') +
        params(param);
    }

    this.get = function(service, param) {
      var url = createUrl(service, param);
      $log.info('createGet url: ' + url);
      return $http.get(url);
    }

    this.post = function(service, param, data) {
      var url = createUrl(service, param);
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
