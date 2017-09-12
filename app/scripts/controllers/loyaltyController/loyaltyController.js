'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */

angular.module('dopApp')
    .service('$loyaltyService', function() {
    this.inSet = false;
    this.person = {};

    this.setPerson = function(person) {
        this.person = person;
    }
})
    .controller('LoyaltyListCtrl', function($scope, $http, Restangular, SweetAlert,
                                             $userService, $mdDialog, $loyaltyService) {
    
    var branch_id = $userService.getCurrentUser().branch_id;
    $scope.pro = $userService.currentUser.pro;
    $scope.loading = true;
    $scope.selected = [];

    $http({
        method: 'GET',
        url: 'http://45.55.7.118:5000/api/loyalty/'+ branch_id + '/people',
    }).success(function(result){
        $scope.people = result.data;
        $scope.loading = false;
        if ($scope.people.length === 0) { $scope.empty = true; }
        else { $scope.empty = false; }
    }).error(function(){
        $scope.loading = false;
        SweetAlert.swal("Error al cargar gente, por favor refresque la pagina", "", "error");
    });

    $scope.dateFormat = function(stringDate) {
        if (stringDate) {
            $scope.formattedDate = new Date(stringDate);
        }
    }

    $scope.getPersonData = function(person) {
        $loyaltyService.setPerson(person);
        $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'LoyaltyModalCtrl',
            templateUrl: '../../views/modalViews/loyaltyModalView.html'
        })
        .then(function(answer) {
            
        }, function() {
            $scope.alert = 'You cancelled the dialog.';
        });
    } 
});
