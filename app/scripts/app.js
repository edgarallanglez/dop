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
    'ngMdIcons',
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
    'angular-jwt',
    'oitozero.ngSweetAlert'
  ])
  .service('$userService', function() {
    this.userId = 0;
    this.branch = new Object();
    this.name = '';
    this.email = '';
    this.branchId = 0;

    this.setUser = function(id, branch, name, email, branchId) {
      this.userId = id 
      this.branch = branch
      this.name = name
      this.email = email
      this.branchId = branchId
    }

  })
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, 
                    $locationProvider, $httpProvider, $authProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $authProvider.signupUrl = 'http://104.236.141.44:5000/api/company/auth/signup';
    $authProvider.loginUrl = 'http://104.236.141.44:5000/api/company/auth/login';
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          authenticated: function($q, $location, $auth, $state) {
            var deferred = $q.defer();
            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      })
      .state('login', {
        url: '/login',
        views: {
          'login': {
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('coupon', {
        url: '/coupon',
        templateUrl: 'views/coupon.html',
        controller: 'CouponCtrl',
        resolve: {
          authenticated: function($q, $location, $auth, $state) {
            var deferred = $q.defer();
            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      })
      .state('report', {
        url: '/report',
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl',
        resolve: {
          authenticated: function($q, $location, $auth, $state) {
            var deferred = $q.defer();
            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      });

    $urlRouterProvider.otherwise('/');

    $authProvider.facebook({
      clientId: '379616075568079'
    });

    $authProvider.google({
      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
    });

    // Theme configurations
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey', {
        'default': '800',
        'hue-1': '100',
        'hue-3': '300'
      })
      .accentPalette('red', {
        'default': '600'
      });
    $mdThemingProvider.theme('green')
      .primaryPalette('light-green')
      .accentPalette('light-blue');

  })
  .controller('TabController', function($scope, $state, $location, $log, $mdSidenav, $http, $templateCache, $auth){
    $scope.reload = true;
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    //Llamar SideBar derecho
    $scope.toggleRightNotifications = function() {
      $mdSidenav('notifications-sidenav').open()
                                          .then(function(){
                                            //Transición terminada
                                          });
    };
    $scope.toggleRightWidgets = function() {
      var closeWidgetsBtn=document.getElementById('closeWidgetsBtn');
      setTimeout(function(){ closeWidgetsBtn.classList.add('active'); },450);
      $mdSidenav('widgets-sidenav').open()
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
          $location.path('/coupon');
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
            var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&callback=JSON_CALLBACK';        
            $http.jsonp(url).success(function(data) {
              $scope.data = data;
              $scope.icon = data.weather[0].icon;
            });
          });
      });
    };
  }]);



     