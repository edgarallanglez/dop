'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:LoyaltyModalCtrl
 * @description
 * # LoyaltyModalCtrl
 * Controller of the dopApp
 */

angular.module('dopApp')
  .config(function($stateProvider) {
  })
  .controller('LoyaltyModalCtrl', function($scope, $http, $mdDialog, 
                                            SweetAlert, $userService, $loyaltyService) {
    
    var branch_id = $userService.getCurrentUser().branch_id;
    $scope.selected = [];
    
    $scope.hide = function() {
      $mdDialog.hide();
    };
    
    $scope.loading = true;
    $scope.loading_content = true;
    $scope.person = $loyaltyService.person;
    $scope.historial = [];
    
    
    $scope.$watch('person', function() {
        $http({
            method: 'GET',
            url: 'http://45.55.7.118:5000/api/loyalty/' + branch_id + '/person/' + $scope.person.user_id + '/get',
        }).success(function(result) {
            $scope.historial = result.data;
            $scope.loading = false;
        }).error(function(){
            SweetAlert.swal("Error al cargar gente, por favor refresque la pagina", "", "error");
        });
        
        $http({
            method: 'GET',
            url: 'http://45.55.7.118:5000/api/loyalty/' + branch_id + '/person/' + $scope.person.user_id + '/stats/get',
        }).success(function(result) {
            $scope.stats = result.data;
            $scope.loading_content = false;
            
        }).error(function(){
            SweetAlert.swal("Error al cargar Stats, por favor refresque la pagina", "", "error");
        });
    });
    
  });