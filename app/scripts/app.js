'use strict';

/**
 * @ngdoc overview
 * @name dopApp
 * @description
 * dopApp
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
  .config(function ($routeProvider, $mdThemingProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
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
    $scope.reload = true;
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

    $scope.$watch('data.selectedIndex', function () {
      //  paint tab after reload
      if ($scope.data && $scope.reload) {
        if ($location.url() == '/coupon') {
          $scope.data.selectedIndex = 1;
          $scope.reload = false;
        } else if ($location.url() == '/report') {
          $scope.data.selectedIndex = 2;
          $scope.reload = false;
        };
      };

        // tab selected change

      if ($scope.data) {
        if ($scope.data.selectedIndex == 0 ) {
          $location.url('/');
        } else if ($scope.data.selectedIndex == 1) {
          $location.url('/coupon');
        } else if ($scope.data.selectedIndex == 2) {
          $location.url('/report');
        };
      };
    });

  })
  //Controlador SideBar derecho
  .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
    $scope.closeNotifications = function() {
      $mdSidenav('notifications-sidenav').close()
          .then(function(){
            $log.debug("close RIGHT is done");
          });
    };
    $scope.closeWidgets = function() {
      $mdSidenav('widgets-sidenav').close()
          .then(function(){
            $log.debug("close RIGHT is done");
          });
    };

  }]);


     