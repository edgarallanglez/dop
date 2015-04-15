'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('LoginCtrl', function($scope, $auth, $http, $templateCache, SweetAlert) {

    $scope.login = function() {
      $auth.login({
        'email': $scope.user,
        'password': $scope.password
      })
      .then(function(response) {
        $auth.setToken(response.data.token, false);
      })
      .catch(function(response) {
          SweetAlert.swal("Oops!", "El usuario y/o contraseña son incorrectos ", "error");
      });

    };
    // $scope.authenticate = function(provider) {
    //   $auth.authenticate(provider);
    // };

  });
