'use strict';

describe('Service: contactService', function () {

  // load the service's module
  beforeEach(module('pms3App'));

  // instantiate service
  var contactService,scope,log;

//  beforeEach(inject(function ($rootScope, $http) {
//    $http.defaults.useXDomain = true;    // CORS
//    scope = $rootScope.$new();
//    http = $http;
//  }));

  beforeEach(angular.mock.inject(function($rootScope,
                                          $http, $location,
                                          $timeout, $controller, $injector,$log){
    scope = $rootScope.$new();
    log = $log;
    //http = $http;
    //location = $location;
    //timeout = $timeout;

    contactService = $injector.get('contactService');

    //$controller('configCtrl', {$scope: scope, $http: http, $location: location, $timeout: timeout, configService: service});
  }));
//  beforeEach(inject(function (_contactService_) {
//    contactService = _contactService_;
//
//  }));

  it('should do something', function () {

    //contactService.findOrCreate(scope);
  });

});
