'use strict';
/**
 * @ngdoc function
 * @name dopApp.controller:CouponCtrl
 * @description
 * # CouponCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('CouponCtrl', function ($scope,$state) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.message = "InMoon Design, hasta la luna y más allá";
    $state.go("coupon");
  })
  .config(function($stateProvider,$urlRouterProvider){
  	$urlRouterProvider.otherwise('/coupon');
    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('coupon', {
	        url: '/coupon',
	        views: {
	            // the child views will be defined here (absolutely named)
	            'genderChart': { templateUrl: '../../views/dashboardViews/genderView.html',
	            				 controller: 'GenderWidgetCtrl'
	            				}
	        }
	    });
	
	//$state.go("coupon");
	
  });



    
    
 
