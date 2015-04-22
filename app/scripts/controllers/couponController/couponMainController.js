'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:CouponMainCtrl
 * @description
 * # CouponMainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('CouponMainCtrl', function($scope,$http) {
    $scope.couponSelected = 0;
    $scope.selectTags = [{
        'label': 'Compra X y llevate X',
        'val': 3 
      },
      { 
        'label': 'Descuento',
        'val': 2
      },
      {
        'label': 'Bono',
        'val': 1
    }];
  	$scope.coupon = { 
      'startDate': new Date(), 
		  'endDate': new Date(), 
      'name':'', 
      'limit':0,
      'receives':0,
      'buy':0,
      'discount':0,
      'bond':0,
      'description':''
    };
    $scope.createCoupon = function() {
      var couponInfo = {
        "name": $scope.coupon.name,
        "branch_id": "2",
        "start_date": $scope.coupon.startDate,
        "end_date": $scope.coupon.endDate,
        "min_spent": "500",
        "limit": $scope.coupon.limit,
        "description": $scope.coupon.description,
        "category_id": $scope.couponSelected
      };

      switch($scope.couponSelected){
        case 1:
          couponInfo.bond_size=50;
          break;
        case 2:
          couponInfo.discount=50;
          break;
        case 3:
          couponInfo.n1=2;
          couponInfo.n2=2;
          break;
      }
      $http({
        method: 'POST',
        url: 'http://104.236.141.44:5000/api/coupon/bond/create',
        data: $.param(couponInfo),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .success(function () {
        console.log("Listo");
      });
      
      };
  });