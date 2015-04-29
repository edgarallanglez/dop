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
    this.isInView = false;
    var coupon={
      'name': 'nombre'
    };
   

    this.setInView = function(currentStatus) {
      this.isInView = currentStatus;
    }

    this.getCoupon = function(){
      return this.isInView;
    }

    return coupon;
  })
  .controller('LastCouponListWidgetCtrl', function($scope,$http,Restangular) {

    $scope.selectCoupon = function(coupon) {
      console.log(coupon);
    }

  	$scope.coupons = [];
    Restangular.all('coupon/all/get').getList()
      .then(function(data){
        $scope.coupons = data;
      });
   /*	$http.get('http://104.236.141.44:5000/api/coupon/get/all').
      success(function(data, status, headers, config) {
        angular.forEach(data.data, function(item) {
        	$scope.coupons.push(item);
        });     
    }).
    error(function(data, status, headers, config) {
      
    });*/
  });