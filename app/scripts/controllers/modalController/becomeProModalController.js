'use strict';
/**
 * @ngdoc function
 * @name dopApp.controller:BecomeProModalCtrl
 * @description
 * # BecomeProModalCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider) { })
  .controller('BecomeProModalCtrl', function($scope, $auth, $http, $mdDialog, $mdToast,
                                              SweetAlert, CouponFactory, $userService, $paymentService) {
  
  $scope.pro = $userService.currentUser.pro;
  $scope.branch_id = $userService.currentUser.branch_id;
  $scope.payment_method = $userService.payment_sources;

  $scope.init = function() {
    setTimeout(function() { window.dispatchEvent(new Event('resize')); }, 900);
  };

  $scope.addPaymentMethod = function() {
    $mdDialog.show({
      locals: { subscribe: true },
      clickOutsideToClose: false,
      controller: 'AddPaymentModalCtrl',
      templateUrl: '../views/modalViews/addPaymentMethod.html',
    });
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.subscribe = function() {
    $scope.loading = true;
    $scope.url = 'http://45.55.7.118:5000/api/company/' + $scope.branch_id+ '/pro/subscription';

    /* Después de tener una respuesta exitosa, envía la información al servidor */
    $http({
      method: 'POST',
      url: $scope.url,
      data: {
        'token_id': '',
        'paymentData': $paymentService.getPaymentData()
      },
      headers: { 'token': $auth.getToken() }
    }).then(function onSuccess(response) {
      $scope.loading = false;
      if (response.data.data == 'PRO') { $userService.currentUser.pro = true }
     $scope.hide();
      $mdToast.show(
        $mdToast.simple()
        .textContent('FELICIDADES! AHORA ERES PRO.')
        .position('top right')
        .hideDelay(3500)
        .theme('success-toast')
      );
    }).catch(function onError(response) {
      SweetAlert.swal('Error', response.message, 'error');
    });

  };
});