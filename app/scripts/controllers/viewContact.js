'use strict';

angular.module('pms3App')
  .controller('ViewContactCtrl', ['$scope',
    'contactService',
    function ($scope, contactService) {
    $scope.contacts = [];
    contactService.findOrCreate($scope);

  }]);
