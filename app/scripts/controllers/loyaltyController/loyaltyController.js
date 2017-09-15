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
    $scope.payment_method = $userService.payment_sources;
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
    };

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
    };
    
  $scope.addPaymentMethod = function() {
    $mdDialog.show({
      locals: { subscribe: true },
      clickOutsideToClose: false,
      controller: 'AddPaymentModalCtrl',
      templateUrl: '../views/modalViews/addPaymentMethod.html',
    });
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.subscribe = function() {
    $scope.loading = true;
    $scope.url = 'http://45.55.7.118:5000/api/company/' + $scope.branch_id+ '/pro/subscription';

    /* Después de tener una respuesta exitosa, envía la información al servidor */
    $http({
      method: 'POST',
      url: $scope.url,
      data: {
        'token_id': '',
        'paymentData': $paymentService.getPaymentData()
      },
      headers: { 'token': $auth.getToken() }
    }).then(function onSuccess(response) {
      $scope.loading = false;
      if (response.data.data == 'PRO') { $userService.currentUser.pro = true }
     $scope.hide();
      $mdToast.show(
        $mdToast.simple()
        .textContent('FELICIDADES! AHORA ERES PRO.')
        .position('top right')
        .hideDelay(3500)
        .theme('success-toast')
      );
    }).catch(function onError(response) {
      SweetAlert.swal('Error', response.message, 'error');
    });

  };
});
