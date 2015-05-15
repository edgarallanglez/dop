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
  .controller('CouponListCtrl', function($scope, Restangular, SweetAlert, CouponFactory, $userService) {
    var godCoupon = new CouponFactory();
    var branch_id = $userService.getCurrentUser().branch_id;
    godCoupon.getAll(branch_id).then(function(data){
      $scope.coupons = data;
      console.log(data);
    })

    $scope.delete = function(coupon) {
      godCoupon.deleteById(coupon.coupon_id);
    }
  });