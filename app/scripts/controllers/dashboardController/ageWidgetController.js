'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:AgeWidgetCtrl
 * @description
 * # AgeWidgetCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('AgeWidgetCtrl', function($scope) {

    $scope.labels = ['12-15', '16-19', '20-24', '25-29', '30-34', '35-39', '+40'];
    $scope.data = [[10, 43, 55, 47, 30, 24, 11]];
    $scope.colours = ['#3F51B5'];
    $scope.$broadcast("$reload", {});

  });