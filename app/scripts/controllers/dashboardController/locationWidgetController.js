'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:LocationWidgetCtrl
 * @description
 * # LocationWidgetCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('LocationWidgetCtrl', function($scope) {

    $scope.map = {
      center: { 
        latitude: 24.78,
        longitude: -107.43
      },
      zoom: 11
    };
  });