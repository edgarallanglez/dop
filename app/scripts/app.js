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
    'ngMaterial',
    'chart.js',
    'uiGmapgoogle-maps',
    'satellizer',
    'angular-jwt',
    'oitozero.ngSweetAlert',
    '720kb.datepicker',
    'restangular',
    'dibari.angular-ellipsis'
  ])
  .service('$userService', function($auth, $http, SweetAlert) {
    this.currentUser = null;
    this.loading = true;
    var self = this;

    this.setUser = function(currentUser) {
      this.currentUser = currentUser;
    };
    this.getCurrentUser = function () {
      return this.currentUser;
    };

    this.getMe = function () {
      var payload = $auth.getPayload();
      return $http({
        method: 'POST',
        url: 'https://inmoon.com.mx/api/company/me',
        data: { 'branches_user_id': payload.id },
        headers: {'Content-Type': 'application/json'}
      }).success(function(data){

        self.loading = false;
        return data.data;
      }).error(function(message) {
        SweetAlert.swal(message, '', 'error');
        self.loading = false;
      });
    };

  })
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $locationProvider, $httpProvider, $authProvider, RestangularProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    RestangularProvider.setBaseUrl('https://inmoon.com.mx/api');
    RestangularProvider.setDefaultHeaders({ 'token' : 'application/json' });
    $authProvider.signupUrl = 'https://inmoon.com.mx/api/company/auth/signup';
    $authProvider.loginUrl = 'https://inmoon.com.mx/api/company/auth/login';
    $authProvider.facebook({ clientId: '927375797314743' });
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
          },
          userService: function($q, $location, $auth, $http, $userService, SweetAlert) {
            var deferred = $q.defer();
            //var payload = $auth.getPayload();
            if (!$userService.getCurrentUser()) {
              $userService.getMe().success(function(data){
                var user = data.data[0];
                $userService.setUser(user);
                //$userService.setLocation(user.location)
                deferred.resolve();
              }).error(function(message){
                SweetAlert.swal(message, 'error');
              });
            } else { deferred.resolve(); }
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
            if ($auth.isAuthenticated()) {
              deferred.resolve();
            } else {
              $location.path('/login');
            }
            return deferred.promise;
          },
          userService: function($q, $location, $auth, $http, $userService, SweetAlert) {
            var deferred = $q.defer();
            //var payload = $auth.getPayload();
            if (!$userService.getCurrentUser()) {
              $userService.getMe().success(function(data){
                var user = data.data[0];
                $userService.setUser(user);
                deferred.resolve();
              }).error(function(){
                SweetAlert.swal('Error en el servidor', '', 'error');
              });
            } else { deferred.resolve(); }
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
            if ($auth.isAuthenticated()) {
              deferred.resolve();
            } else {
              $location.path('/login');
            }
            return deferred.promise;
          },
          userService: function($q, $location, $auth, $http, $userService, SweetAlert) {
            var deferred = $q.defer();
            //var payload = $auth.getPayload();
            if (!$userService.getCurrentUser()) {
              $userService.getMe().then(function(data){
                var user = data.data;
                $userService.setUser(user);
                deferred.resolve();
              });
            } else { deferred.resolve(); }
            return deferred.promise;
          }
        }
      });

    $urlRouterProvider.otherwise('/');
    // Theme configurations

    // $mdThemingProvider.theme('default')
    //   .primaryPalette('blue-grey', {
    //     'default': '800',
    //     'hue-1': '100',
    //     'hue-3': '300'
    //   })
    //   .accentPalette('red', {
    //     'default': '600'
    //   });
    $mdThemingProvider.theme('green')
      .primaryPalette('light-green')
      .accentPalette('blue');


    $mdThemingProvider.definePalette('dopPalette', {
      '50': '#ffffff',
      '100': '#fedbe8',
      '200': '#fda4c4',
      '300': '#fc5e96',
      '400': '#fc4083',
      '500': '#fb226f',
      '600': '#fa055c',
      '700': '#dc0451',
      '800': '#be0346',
      '900': '#a0033b',
      'A100': '#ffffff',
      'A200': '#fedbe8',
      'A400': '#fc4083',
      'A700': '#dc0451',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 A100 A200'
    });

    $mdThemingProvider.theme('defaults')
      .primaryPalette('dopPalette', {
          'default': '400',
          'hue-1': '100',
          'hue-2': '300'
      });
})
  .controller('MeCtrl', function($scope, $http, $auth, $userService, $mdSidenav, $log, $location){
    $scope.init = function () {
      if (!$userService.getCurrentUser() && $auth.isAuthenticated()) {
        var payload = $auth.getPayload();
        $http({
          method: 'POST',
          url: 'https://inmoon.com.mx/api/company/me',
          data: { 'branches_user_id': payload.id },
          headers: {'Content-Type': 'application/json'}
        }).success(function(data){
          $userService.setUser(data.data[0]);
          $scope.user = $userService.getCurrentUser();
        });
      } else {
        $location.path('/login');
      }
    };
    $scope.init();

    $scope.closeWidgets = function() {
      $mdSidenav('widgets-sidenav').close()
                                    .then(function(){
                                      $log.debug('close RIGHT is done');
                                    });
    };
  })
  .controller('TabController', function($scope, $state, $location, $userService, $log, $mdSidenav, $http, $templateCache, $auth, $mdDialog){
    $scope.reload = true;

    $scope.$watch(function() {
      return $userService.loading;
    }, function (flag) {
        $scope.loading = flag;
    });

    $scope.openMenu = function($mdOpenMenu, ev) {
      var  originatorEv = ev;
      $mdOpenMenu(ev);
    };
    $scope.notificationsEnabled = true;
    $scope.toggleNotifications = function() {
      $scope.notificationsEnabled = !$scope.notificationsEnabled;
    };

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

    $scope.showCreditModal = function(ev) {

      $mdDialog.show({
        clickOutsideToClose: false,
        controller: 'AddCreditModalCtrl',
        templateUrl: '../views/modalViews/addCreditModalView.html',
        targetEvent: ev,
      })

      .then(function(answer) {
        //SweetAlert.swal("Cancelado", "Tu compra ha sido cancelada :)", "error");
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };

    $scope.$watch('data.selectedIndex', function () {
      //  paint tab after reload
      if ($scope.data && $scope.reload) {
        if ($location.path() === '/') {
          $scope.data.selectedIndex = 0;
          $scope.reload = false;
        } else if ($location.path() === '/coupon') {
          $scope.data.selectedIndex = 1;
          $scope.reload = false;
        } else if ($location.path() === '/report') {
          $scope.data.selectedIndex = 2;
          $scope.reload = false;
        }
      }

      // tab selected change
      if ($scope.data) {
        if ($scope.data.selectedIndex === 0 && $auth.isAuthenticated() ) {
          $location.path('/').replace();
        } else if ($scope.data.selectedIndex === 1 && $auth.isAuthenticated()) {
          $location.path('/coupon').replace();
        } else if ($scope.data.selectedIndex === 2 && $auth.isAuthenticated()) {
          $location.path('/report').replace();
        }
      }
    });

  })
  .controller('NotificationCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav, $log){
        $scope.closeNotifications = function() {
      $mdSidenav('notifications-sidenav').close()
                                          .then(function(){
                                            $log.debug('close RIGHT is done');
                                          });
    };
  }]);
