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
    $scope.amountOfCoupon = 1;
    $scope.expireTime = 1;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.payment = function() {
      alert("sigue la ventana para la tarjeta de credito");
    };

  });