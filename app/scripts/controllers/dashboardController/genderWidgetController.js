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
  .controller('GenderWidgetCtrl', function($rootScope, $scope, $http, $userService) {
  	var branch_id = $userService.getCurrentUser().branch_id;
    $scope.empty = true;

  	$http({
      method: 'GET',
      url: 'http://45.55.7.118:5000/api/coupon/used/gender/'+ branch_id,
    }).then(function(data){
      $scope.genders = data.data;
      angular.forEach($scope.genders.data, function(value, key) {
        if (value.gender === 'male') { $scope.data[0] = value.count; }
        else if (value.gender === 'female') { $scope.data[1] = value.count; }
      });
      if ($scope.data[0] === 0 && $scope.data[1] === 0) { $scope.empty = true; }
      else { $scope.empty = false; }
    });

    $scope.labels = ['Hombres', 'Mujeres'];
    $scope.data = [0, 0];
    $scope.colours = ['#448AFF', '#FF4081'];

  });
