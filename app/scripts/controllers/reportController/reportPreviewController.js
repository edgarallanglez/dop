'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ReportPreviewCtrl
 * @description
 * # ReportPreviewCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('ReportPreviewCtrl', function($scope, $http, $userService) {
    $scope.loading = true;

    var branch_id = $userService.getCurrentUser().branch_id;

    $http({
      method: 'GET',
      url: 'http://45.55.7.118:5000/api/coupon/all/'+ branch_id + '/get',
    }).success(function(data) {
      angular.forEach(data.data, function(value, key){
        console.log(value.name);
        $scope.loading = false;

        $scope.coupons = data;
      });
    });
  });
