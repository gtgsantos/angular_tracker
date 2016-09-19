'use strict';

angular.module('mutrack', ['ngRoute']) 
  .config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'src/home/home.html',
        controller: 'HomeCtrl'
      })
      .when('/user', {
        templateUrl: 'src/user/user.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })