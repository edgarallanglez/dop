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
  .controller('CouponListCtrl', function($scope, $http, Restangular, SweetAlert, CouponFactory, $userService, $couponService, $lastCouponService) {
    var godCoupon = new CouponFactory();
    var branch_id = $userService.getCurrentUser().branch_id;

    if($lastCouponService.getCoupon().coupon_id != null){
      $scope.showConfigModal($lastCouponService.getCoupon());
    }


    $scope.promod = new Date();
    $http({
      method: 'GET',
      url: 'http://45.55.7.118:5000/api/coupon/all/'+ branch_id + '/get',
    }).success(function(data){
      $scope.coupons = data;
      if ($scope.coupons.data.length === 0) { $scope.empty = true; }
      else { $scope.empty = false; }
    }).error(function(){
      SweetAlert.swal("Error al cargar cupones, porfavor refresque la pagina", "", "error")
    });

    $scope.dateFormat = function(stringDate) {
      if (stringDate) {
        $scope.formattedDate = new Date(stringDate);
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
