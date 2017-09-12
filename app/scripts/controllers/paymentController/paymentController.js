'use strict';
/**
 * @ngdoc function
 * @name dopApp.controller:PaymentController
 * @description
 * # PaymentController
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('PaymentModalCtrl', function($scope, $auth, $http, $mdDialog, $mdToast, SweetAlert, CouponFactory, $userService, $paymentService) {
    $scope.total = $paymentService.paymentData.total;
    $scope.total_label = $scope.total / 100;

    // Bonus calculation.
    if ($scope.total >= 100000 && $scope.total < 200000) { $scope.bonus = $scope.total * 0.1; }
    if ($scope.total >= 200000 && $scope.total < 500000) { $scope.bonus = $scope.total * 0.25; }
    if ($scope.total >= 500000) { $scope.bonus = $scope.total * 0.4; }

    $scope.cardData = {};
    $scope.branch_id = $userService.currentUser.branch_id;
    $scope.payment_source = $userService.payment_sources;
    $scope.sendPayment = function() {
      $scope.cardData = {
        'name': $scope.cardData.name,
        'number': $scope.cardData.number,
        'cvc': $scope.cardData.cvc,
        'exp_month': $scope.cardData.expMonth,
        'exp_year': $scope.cardData.expYear
      };

      /* Después de tener una respuesta exitosa, envía la información al servidor */
      var successResponseHandler = function(token) {
        if ($paymentService.paymentData.service === 'campaign') {
          $scope.url = 'http://45.55.7.118:5000/api/coupon/payment/campaign/card';
        } else {
          $scope.url = 'http://45.55.7.118:5000/api/company/' + $scope.branch_id+'/credits/add';
        }
        $http({
          method: 'POST',
          url: $scope.url,
          data: {
            'token_id': token.id,
            'paymentData': $paymentService.getPaymentData()
          },
          headers: { 'token': $auth.getToken() }
        }).success(function(message){
          $userService.currentUser.credits = $userService.currentUser.credits + ($scope.total / 100) + $scope.bonus;
          $scope.hide();
          $mdToast.show(
            $mdToast.simple()
              .textContent('FELICIDADES! AHORA CUENTAS CON ' + $userService.currentUser.credits +' CRÉDITOS.')
              .position('top right')
              .hideDelay(3500)
              .theme('success-toast')
          );
        });
      };

      /* Después de recibir un error */
      var errorResponseHandler = function(error) {
        SweetAlert.swal('Error', error.message, 'error');
      };

      var tokenParams = { 'card': $scope.cardData };
      Conekta.token.create(tokenParams, successResponseHandler, errorResponseHandler);
    };

    $scope.hide = function() {
      $mdDialog.hide();
    };
  });
