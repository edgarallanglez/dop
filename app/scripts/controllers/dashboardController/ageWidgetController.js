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
  .controller('AgeWidgetCtrl', function($scope, $http, $userService) {
    var branch_id = $userService.getCurrentUser().branch_id;
    $scope.empty = false;
    $scope.loading = true;
    $scope.getByAge = function(){
      $scope.ranges = [];
      $scope.data = [[0, 0, 0, 0, 0, 0, 0, 0]];
      $scope.loading = true;
      $http({
        method: 'GET',
        url: 'http://45.55.7.118:5000/api/coupon/used/ages/'+ branch_id,
      }).then(function(data){
        $scope.ranges = data.data;
        if (data.data.data.length === 0) { $scope.empty = true; }
        else { $scope.empty = false; }
        angular.forEach($scope.ranges.data, function(value, key) {
          if(value.age == null){
            $scope.data[0][0] += value.count;
          }
          if(value.age >= 12 && value.age <= 15){
            $scope.data[0][1] += value.count;
          }
          if(value.age >= 16 && value.age <= 19){
            $scope.data[0][2] += value.count;
          }
          if(value.age >= 20 && value.age <= 24){
            $scope.data[0][3] += value.count;
          }
          if(value.age >= 25 && value.age <= 29){
            $scope.data[0][4] += value.count;
          }
           if(value.age >= 30 && value.age <= 34){
            $scope.data[0][5] += value.count;
          }
           if(value.age >= 35 && value.age <= 39){
            $scope.data[0][6] += value.count;
          }
           if(value.age >= 40){
            $scope.data[0][7] += value.count;
          }
        });
        $scope.loading = false;
      });
    }
    $scope.getByAge();
    $scope.labels = ['Indefinido', '12-15', '16-19', '20-24', '25-29', '30-34', '35-39', '+40'];
    $scope.data = [[0, 0, 0, 0, 0, 0, 0, 0]];
    $scope.colors = [{
      backgroundColor: '#fb226f',
      borderColor: '#C2185B'
//      backgroundColor: '#FF7474',
//      borderColor: '#FF4081'
    }];
     $scope.options = {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    fixedStepSize: 1
                }
            }]
        }
    }
    $scope.$broadcast("$reload", {});

  });
