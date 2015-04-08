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
    $scope.login = function() {
      $auth.login({
        'email': $scope.user,
        'password': $scope.password
      })
      .then(function(response) {
        console.log(response.data);
        $auth.setToken(response.data.token,false);
      });

    };
    // $scope.authenticate = function(provider) {
    //   $auth.authenticate(provider);
    // };

  });
