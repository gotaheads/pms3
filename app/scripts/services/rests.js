'use strict';

angular.module('pms3App')
  .service('rests', function rests() {

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
  });
