'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .service('$paymentService', function(){
    this.paymentData = {}

    this.setPayment = function(amount, time, total) {
      this.paymentData = {
        'amountOfCoupon': amount,
        'expireTime': time,
        'total': total
      }
    }

    this.getPaymentData = function() {
      return this.paymentData;
    }
  })

  .controller('PricingModalCtrl', function($scope, $mdDialog, SweetAlert, CouponFactory, $userService, $paymentService) {
    $scope.amountOfCoupon = 5;
    $scope.expireTime = 1;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.doPayment = function(ev) {
      $scope.total = (($scope.amountOfCoupon/5) * $scope.expireTime) * 100;
      $paymentService.setPayment($scope.amountOfCoupon, $scope.expireTime, $scope.total);
      $mdDialog.show({
          clickOutsideToClose: false,
          controller: "PaymentModalCtrl",
          templateUrl: "../../views/modalViews/paymentModalView.html",
          targetEvent: ev,
        })
    };


  });