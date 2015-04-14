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
  .controller('BasicReportCtrl', function($scope, reportService) {
    reportService.setInView(true);
    $scope.isInView = reportService.getInView();
    $scope.toggleRight = function() {
      
    };
  });