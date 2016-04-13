'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:AddCreditModalCtrl
 * @description
 * # AddCreditModalCtrl
 * Controller of the dopApp
 */

angular.module('dopApp')
  .config(function($stateProvider) {
  })
  .controller('AddCreditModalCtrl', function($scope, $mdDialog, SweetAlert, CouponFactory, $userService, $paymentService) {
    console.log('holis');

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.doPayment = function(amount) {
      if ($scope.credits === undefined) { $scope.total = amount * 100; } else { $scope.total = $scope.credits * 100; }

      $paymentService.setPayment($scope.amountOfCoupon, $scope.expireTime, $scope.total, 'credits');
      $mdDialog.show({
          clickOutsideToClose: false,
          controller: 'PaymentModalCtrl',
          templateUrl: '../views/modalViews/paymentModalView.html',
          targetEvent: amount,
        });
    };

  });
