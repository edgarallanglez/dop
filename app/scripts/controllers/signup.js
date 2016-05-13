'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('SignupCtrl', function($scope, $location, $auth, $mdToast) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $location.path('/');
          $mdToast.show(
            $mdToast.simple()
              .textContent('TU CUENTA SE HA CREADO EXITOSAMENTE!')
              .position('top right')
              .hideDelay(3500)
              .theme('success-toast')
          );
        })
        .catch(function(response) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('HA OCURRIDO UN ERROR!')
              .position('top right')
              .hideDelay(3500)
              .theme('error-toast')
          );
        });
    };
  });
