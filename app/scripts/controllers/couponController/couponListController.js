'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('CouponListCtrl', function($scope,$http) {
    $scope.todos = [];

    $http.get('http://104.236.141.44:5000/api/coupon/get/all')
    .success(function(data, status, headers, config) {
        angular.forEach(data.data, function(item) {
          $scope.todos.push(item);
        });     
    })
    .error(function(data, status, headers, config) {
      
    });
  })
  .filter('monthName', [function() {
      return function (monthNumber) {
          var monthNames = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
              'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
          return monthNames[monthNumber - 1];
      }
  }]);