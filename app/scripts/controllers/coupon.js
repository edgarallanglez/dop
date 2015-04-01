'use strict';
/**
 * @ngdoc function
 * @name dopApp.controller:CouponCtrl
 * @description
 * # CouponCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('CouponCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.message = "InMoon Design, hasta la luna y más allá";
  })
  .config(function($stateProvider,$urlRouterProvider){
  	$urlRouterProvider.otherwise('/coupon');
    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('coupon', {
	        url: '/coupon',
	        views: {
	            // the child views will be defined here (absolutely named)
	            'genderChart': { template: '<h1>Look I am a column!</h1>' }
	        }
	    });
	
	//$state.go("coupon");
	
  });



    
    
 
