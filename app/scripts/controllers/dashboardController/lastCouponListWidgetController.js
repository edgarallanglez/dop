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
  .service('$lastCouponService', function() {
    this.coupon = {};
    this.getCoupon = function () {
        return this.coupon;
    }

    this.setCoupon = function(coupon){
       this.coupon = coupon;
    }
  })
  .controller('LastCouponListWidgetCtrl', function($scope, $userService, CouponFactory, $lastCouponService, $state) {
    $scope.loading = true;
    $scope.select = function(coupon) {
      $lastCouponService.setCoupon(coupon);
      $state.go('coupon');
    }

    var godCoupon = new CouponFactory();
    var branch_id = $userService.getCurrentUser().branch_id;
    godCoupon.getAll(branch_id).then(function(data){
      $scope.coupons = data;
      $scope.loading = false;
    });
  });