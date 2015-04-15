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
  	$scope.coupon= { 'startDate': new Date(), 
  									 'endDate': new Date(), 
                     'name':'', 
                     'limit':0,
                     'receives':0,
                     'buy':0,
                     'discount':0,
                     'bond':0,
                     'description':''
                   }
  });