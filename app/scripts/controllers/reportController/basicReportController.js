'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:BasicReportCtrl
 * @description
 * # BasicReportCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('BasicReportCtrl', function($scope) {

    $scope.labels = ['Hombres', 'Mujeres'];
    $scope.data = [55, 23];
    $scope.colours = ['#3F51B5', '#FF4081'];
  });