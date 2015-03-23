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
      .when('/login', {
        templateUrl: '../login.html',
        controller: 'LoginController'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/coupon', {
        templateUrl: 'views/coupon.html',
        controller: 'CouponCtrl'
      })
      .when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey', {
        'hue-1': '100',
        'hue-3': '300'
      })
      .accentPalette('light-blue');
  })
  .controller('TabController', function($scope, $location, $log, $mdSidenav){
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function(current, old) {
      switch(current) {
        case 0: $location.url("/"); break;
        case 1: $location.url("/coupon"); break;
        case 2: $location.url("/report"); break;
      }
    });
    //Llamar SideBar derecho
    $scope.toggleRightNotifications = function() {
      $mdSidenav('notifications-sidenav').toggle()
                          .then(function(){
                            //Transición terminada
                          });
    };
    $scope.toggleRightWidgets = function() {
      $mdSidenav('widgets-sidenav').toggle()
                          .then(function(){
                            //Transición terminada
                          });
    };
  })
  //Controlador SideBar derecho
  .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function(scope,to,mds,log) {
    scope.closeNotifications = function() {
      mds('notifications-sidenav').close()
          .then(function(){
            log.debug("close RIGHT is done");
          });
    };
    scope.closeWidgets = function() {
      mds('widgets-sidenav').close()
          .then(function(){
            log.debug("close RIGHT is done");
          });
    };
  }]);


     