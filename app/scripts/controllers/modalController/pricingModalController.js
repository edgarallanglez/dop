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
  .controller('PricingModalCtrl', function($scope, $mdDialog, SweetAlert, CouponFactory, $userService) {
    $scope.amountOfCoupon = 5;
    $scope.expireTime = 1;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.doPayment = function(ev) {
      $mdDialog.show({
          clickOutsideToClose: false,
          controller: "PaymentModalCtrl",
          templateUrl: "../../views/modalViews/paymentModalView.html",
          targetEvent: ev,
        })
    };

  });