'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .service('$couponService', function() {
    this.inSet = false;
    this.coupon = {};

    this.setCoupon = function(coupon) {
      this.coupon = coupon;
    }
  })
  .config(function($stateProvider){
  })
  .controller('CouponListCtrl', function($scope, $http, Restangular, SweetAlert, CouponFactory, $userService, $couponService) {
    var godCoupon = new CouponFactory();
    var branch_id = $userService.getCurrentUser().branch_id;
    

    $http({
      method: 'GET',
      url: 'http://104.236.141.44:5000/api/coupon/all/'+ branch_id + '/get',
    }).then(function(data){
      $scope.coupons = data.data;
    });

    
    $scope.delete = function(coupon) {
      godCoupon.deleteById(coupon.coupon_id);
    }

    $scope.configCoupon = function(coupon) {
      $couponService.setCoupon(coupon);
      $couponService.inSet = true; 
    }
  });