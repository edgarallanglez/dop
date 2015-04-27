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
    $scope.colours = [{
      fillColor: '#03A9F4',
      strokeColor: '#1976D2',
      highlightFill: '#4FC3F7',
      highlightStroke: '#03A9F4'
    }];
    // $scope.options = {
    //   scaleGridLineColor : "white",
    //   scaleFontColor: "white"
    // }
    $scope.$broadcast("$reload", {});

  });