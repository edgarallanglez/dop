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
  .factory('$lastCouponFactory', function() {
    var coupon = {};

    return {
        getCoupon : function () {
            return this.coupon;
        },
        setCoupon : function(coupon){
           this.coupon = coupon;
        }
    }       
  })
  .controller('LastCouponListWidgetCtrl', function($scope,$http,Restangular,$location,$lastCouponFactory) {

    $scope.select = function(coupon) {
      $lastCouponFactory.setCoupon(coupon);
      $location.path('/coupon');
    }

  	$scope.coupons = [];
    Restangular.all('coupon/all/get').getList()
      .then(function(data){
        $scope.coupons = data;
      });
  });