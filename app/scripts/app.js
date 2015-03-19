'use strict';

/**
 * @ngdoc overview
 * @name dopApp
 * @description
 * # dopApp
 *
 * Main module of the application.
 */
angular
  .module('dopApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function ($routeProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/coupon', {
        templateUrl: 'views/coupon.html',
        controller: 'CouponCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('light-blue');
  })
  .controller('TabController', function($scope, $location, $log){
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function(current, old) {
      switch(current) {
        case 0: $location.url("/"); break;
        case 1: $location.url("/coupon"); break;
        case 2: $location.url("/report"); break;
      }
    });
  });


     