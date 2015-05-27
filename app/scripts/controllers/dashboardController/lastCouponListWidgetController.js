'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:LastCouponListCtrl
 * @description
 * # LastCouponListCtrl
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
  .controller('LastCouponListWidgetCtrl', function($scope, $http,$userService, CouponFactory, $lastCouponService, $state) {
    $scope.loading = true;
    $scope.select = function(coupon) {
      $lastCouponService.setCoupon(coupon);
      $state.go('coupon');
    }

    var branch_id = $userService.getCurrentUser().branch_id;

    $http({
      method: 'GET',
      url: 'http://104.236.141.44:5000/api/coupon/all/'+ branch_id + '/get',
    }).then(function(data){
      $scope.coupons = data.data;
      $scope.loading = false;
    });
  });