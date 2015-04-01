'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:CouponWidgetCtrl
 * @description
 * # CouponWidgetCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('CouponWidgetCtrl', ['$scope', function($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.data = {
      selectedIndex : 1,
      secondLocked : true,
      secondLabel : "Item Two"
    };
    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };
    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
   
  
  }])