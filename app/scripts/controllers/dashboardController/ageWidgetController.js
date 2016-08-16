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
    $scope.empty = true;

    $http({
      method: 'GET',
      url: 'http://45.55.7.118:5000/api/coupon/used/ages/'+ branch_id,
    }).then(function(data){
      $scope.ranges = data.data;
      if (data.data.data.length === 0) { $scope.empty = false; }
      else { $scope.empty = false; }
      angular.forEach($scope.ranges.data, function(value, key) {
        if(value.age <= 15){
          $scope.data[0][0] = value.count;
        }
        if(value.age >= 16 && value.age <= 19){
          $scope.data[0][1] = value.count;
        }
        if(value.age >= 20 && value.age <= 24){
          $scope.data[0][2] = value.count;
        }
        if(value.age >= 25 && value.age <= 29){
          $scope.data[0][3] = value.count;
        }
         if(value.age >= 30 && value.age <= 34){
          $scope.data[0][4] = value.count;
        }
         if(value.age >= 35 && value.age <= 39){
          $scope.data[0][5] = value.count;
        }
         if(value.age >= 40){
          $scope.data[0][6] = value.count;
        }
      });
      $scope.loading = false;
    });

    $scope.labels = ['12-15', '16-19', '20-24', '25-29', '30-34', '35-39', '+40'];
    $scope.data = [[0, 0, 0, 0, 0, 0, 0]];
    $scope.colours = [{
      fillColor: '#448AFF',
      strokeColor: '#3972D2',
      highlightFill: '#4A88F2',
      highlightStroke: '#03A9F4'
    }];
    // $scope.options = {
    //   scaleGridLineColor : "white",
    //   scaleFontColor: "white"
    // }
    $scope.$broadcast("$reload", {});

  });
