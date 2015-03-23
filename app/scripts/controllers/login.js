'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:CouponCtrl
 * @description
 * # CouponCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('LoginCtrl', function ($scope,$http, $templateCache) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var method = 'POST';
  	var url = 'http://104.236.141.44:5000/login';
  	$scope.codeStatus = "";
    $scope.login = function(){
    	var FormData = {
	      'name' : "jose",
	      'password' : "123"
    	};
	    $http({
	      method: method,
	      url: url,
	      data: FormData,
	      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	      cache: $templateCache
	    }).
	    success(function(response) {
        	$scope.codeStatus = response.data;
	    }).
	    error(function(response) {
	        $scope.codeStatus = response || "Request failed";
	    });
	    return false;
	}
  });
