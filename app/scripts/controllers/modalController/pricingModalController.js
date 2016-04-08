'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:PricingModalCtrl
 * @description
 * # PricingModalCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .service('$paymentService', function(){
    this.paymentData = {};

    this.setPayment = function(amount, time, total, service) {
      this.paymentData = {
        'amountOfCoupon': amount,
        'expireTime': time,
        'total': total,
        'service': service
      };
    };

    this.getPaymentData = function() {
      return this.paymentData;
    };
  })

  .controller('PricingModalCtrl', function($scope, $mdDialog, SweetAlert, CouponFactory, $userService, $paymentService) {
    $scope.amountOfCoupon = 50;
    $scope.expireTime = 1;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.doPayment = function(ev) {
      $scope.total = (($scope.amountOfCoupon/5) * $scope.expireTime) * 100;
      $paymentService.setPayment($scope.amountOfCoupon, $scope.expireTime, $scope.total, 'campaign');
      $mdDialog.show({
          clickOutsideToClose: false,
          controller: "PaymentModalCtrl",
          templateUrl: "../../views/modalViews/paymentModalView.html",
          targetEvent: ev,
        });
    };

    $scope.selectPaymentMethod = function(ev) {
      var controller = 'CreditsModalCtrl';
      var template = '../../views/modalViews/creditsModalView.html';
      $mdDialog.show({
          clickOutsideToClose: false,
          controller: controller,
          templateUrl: template,
          targetEvent: ev,
        });
    };


  });
