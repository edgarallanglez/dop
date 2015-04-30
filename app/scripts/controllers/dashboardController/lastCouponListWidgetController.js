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
  .controller('LastCouponListWidgetCtrl', function($scope,$http,Restangular,$location,$lastCouponService, $state) {

    $scope.select = function(coupon) {
      $lastCouponService.setCoupon(coupon);
      $state.go('coupon');
    }

  	$scope.coupons = [];
    Restangular.all('coupon/all/get').getList()
      .then(function(data){
        $scope.coupons = data;
      });
  });