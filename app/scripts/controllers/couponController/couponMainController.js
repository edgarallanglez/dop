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
  .controller('CouponMainCtrl', function($scope) {
    $scope.couponSelected = 0;
    $scope.selectTags = [{
        'label': 'Compra X y llevate X',
        'val': 1 
      },
      { 
        'label': 'Descuento',
        'val': 2
      },
      {
        'label': 'Bono',
        'val': 3
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
      var benefits;
      switch($scope.couponSelected){
        case 1:
          benefits = {"n1":"2","n2":"1"};
          break;
        case 2:
          benefits = {"discount":"50"};
          break;
        case 3:
          benefits = {"bond_size":"50"};
          break;
      }

      var couponInfo = {
        "name": $scope.coupon.name,
        "branch_id": "2",
        "start_date": $scope.coupon.startDate,
        "end_date": $scope.coupon.endDate,
        "min_spent": "500",
        "limit": $scope.coupon.limit,
        "description": $scope.coupon.description,
        "category_id": "1",
        benefits
      };
      console.log(couponInfo);
    };
  });