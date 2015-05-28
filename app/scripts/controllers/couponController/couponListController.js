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
  .controller('CouponListCtrl', function($scope, $http, Restangular, SweetAlert, CouponFactory, $userService, $couponService) {
    var godCoupon = new CouponFactory();
    var branch_id = $userService.getCurrentUser().branch_id;
    
    $scope.promod = new Date();
    $http({
      method: 'GET',
      url: 'http://104.236.141.44:5000/api/coupon/all/'+ branch_id + '/get',
    }).then(function(data){
      $scope.coupons = data.data;
      console.log(data.data);
    });

    $scope.dateFormat = function(stringDate) {
      if (stringDate) {
        $scope.formattedDate = new Date(stringDate);
        console.log($scope.formattedDate);
      }
    }

    $scope.delete = function(coupon) {
      godCoupon.deleteById(coupon.coupon_id);
    }

    $scope.configCoupon = function(coupon) {
      $couponService.setCoupon(coupon);
      $couponService.inSet = true; 
    }
  });