'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('LoginCtrl', function ($scope, $auth, $http, $templateCache) {

    var method = 'POST';
  	var url = 'http://104.236.141.44:5000/company/auth/signup';
  	$scope.codeStatus = "";
    $scope.login = function(){

    	var FormData = {
	      'email' : "jose",
	      'password' : "123"
    	};
        console.log(FormData);
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

      $scope.authenticate = function(provider) {
        $auth.authenticate(provider);
      };

  });
