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

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  });