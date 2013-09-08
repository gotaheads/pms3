'use strict';

angular.module('pms3App')
  .service('reportService', ['$log', '$routeParams',
    function reportService($log, $routeParams) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    $log.info('start reportService ');

    this.load = function() {
      var code = $routeParams.code;

      $log.info('reportService code:' + code);

    }

  }]);
