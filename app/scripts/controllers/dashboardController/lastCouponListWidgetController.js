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
  .controller('LastCouponListWidgetCtrl', function($scope,$http) {
  	$scope.coupons = [];

   	$http.get('http://104.236.141.44:5000/api/coupon/get/all').
      success(function(data, status, headers, config) {
        angular.forEach(data.data, function(item) {
        	if(item.limit==0)
        		item.limit="Ilimitado";
        	else
        		item.limit="Para "+item.limit+" personas";
        	
        	$scope.coupons.push(item);
        });     
    }).
    error(function(data, status, headers, config) {
      
    });
  });