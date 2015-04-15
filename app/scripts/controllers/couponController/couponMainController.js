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
>>>>>>> 31c204cc0c53ef9e71173089d5be4c7765004a69
  });