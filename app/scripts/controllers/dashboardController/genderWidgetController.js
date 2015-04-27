'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:GenderWidgetCtrl
 * @description
 * # GenderWidgetCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('GenderWidgetCtrl', function($rootScope, $scope) {

    $scope.labels = ['Hombres', 'Mujeres'];
    $scope.data = [55, 23];
    $scope.colours = ['#1976D2', '#E53935'];  

  });