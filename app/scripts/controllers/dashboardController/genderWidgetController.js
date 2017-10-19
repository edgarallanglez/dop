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
  .controller('GenderWidgetCtrl', function($rootScope, $scope, $http, $userService, $mdDialog) {
    var branch_id = $userService.getCurrentUser().branch_id;
    $scope.pro = $userService.currentUser.pro;
    $scope.payment_method = $userService.payment_sources;
    $scope.empty = false;
    $scope.loading = true;

    $scope.getByGender = function(){

      $scope.loading = true;
      $scope.genders = [];
      $scope.data = [0, 0, 0];

      $http({
      method: 'GET',
      url: 'http://45.55.7.118:5000/api/coupon/used/gender/'+ branch_id,
      }).then(function(data) {
        $scope.genders = data.data;
        $scope.loading = false;

        angular.forEach($scope.genders.data, function(value, key) {
          if (value.gender === 'male') { $scope.data[0] = value.count; }
          else if (value.gender === 'female') { $scope.data[1] = value.count; }
          else if(value.gender === null) { $scope.data[2] = value.count; }
        });
        if ($scope.data[0] === 0 && $scope.data[1] === 0 && $scope.data[2] === 0) { $scope.empty = true; }
        else { $scope.empty = false; }
      });
    }
  	
    $scope.getByGender();

    $scope.labels = ['Hombres', 'Mujeres', 'Sin especificar'];
    $scope.data = [0, 0, 0];
    $scope.colors = ['#2d67dc', '#fb226f', '#9e9e9e'];
  
    $scope.showProModal = function (ev) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'BecomeProModalCtrl',
        templateUrl: '../views/modalViews/becomeProModalView.html',
        targetEvent: ev,
      });
    };

  });
