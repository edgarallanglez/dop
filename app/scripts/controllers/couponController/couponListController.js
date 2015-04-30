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
  .controller('CouponListCtrl', function($scope, Restangular, $http) {
    Restangular.all('coupon/all/get').getList()
    .then(function(data){
      $scope.coupons = data;
    });

    $scope.delete = function(coupon) {
      
    }
  });