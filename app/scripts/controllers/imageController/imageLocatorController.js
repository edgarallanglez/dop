'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageLocatorCtrl
 * @description
 * # ImageLocatorCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')

  .controller('ImageLocatorCtrl', function ($scope, location) {

    location.get(angular.noop, angular.noop);
    $scope.isModalVisible = false;
    $scope.locator = function() {
      console.log('locator');
    };

    $scope.toggleModal = function() {
      console.log(lookedUpLocation);
    };

    $scope.$watch('lookedUpLocation', $scope.toggleModal);
  });
