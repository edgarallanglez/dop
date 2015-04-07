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
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'chart.js',
    'uiGmapgoogle-maps',
    'satellizer',
    'angular-jwt'
  ])
  .config(function ($routeProvider, $mdThemingProvider, $locationProvider, $httpProvider, $authProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginCtrl'
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

    $authProvider.facebook({
      clientId: '379616075568079'
    });

    $authProvider.google({
      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
    });
  })
  .controller('TabController', function($scope, $location, $log, $mdSidenav, $http, $templateCache){
    $scope.reload = true;
    
    //Llamar SideBar derecho
    $scope.toggleRightNotifications = function() {
      $mdSidenav('notifications-sidenav').toggle()
                          .then(function(){
                            //Transición terminada
                          });
    };
    $scope.toggleRightWidgets = function() {
      var closeWidgetsBtn=document.getElementById('closeWidgetsBtn');
      setTimeout(function(){ closeWidgetsBtn.classList.add('active'); },450);
      $mdSidenav('widgets-sidenav').toggle()
                          .then(function(){
                            //Transición terminada
                          });
    };

    $scope.$watch('data.selectedIndex', function () {
      //  paint tab after reload
      if ($scope.data && $scope.reload) {
        if ($location.url() == '/') {
          $scope.data.selectedIndex = 0;
          $scope.reload = false;
        } else if ($location.url() == '/coupon') {
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
  .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$http', function($scope, $timeout, $mdSidenav, $log, $http) {
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

    //Obtener clima según locación
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
          $scope.$apply(function(){

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var method = 'GET';
            var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&callback=JSON_CALLBACK';        
            $http.jsonp(url).success(function(data) {
              $scope.data = data;
              $scope.icon = data.weather[0].icon;
            });
          });
      });
    };
  }])



     