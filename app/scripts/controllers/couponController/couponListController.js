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
  .controller('CouponListCtrl', function($scope, Restangular, SweetAlert, CouponFactory) {
    var godCoupon = new CouponFactory();

    godCoupon.getAll().then(function(data){
      $scope.coupons = data;
    })

    $scope.delete = function(coupon) {
      godCoupon.deleteById(coupon.coupon_id);
    }
  });