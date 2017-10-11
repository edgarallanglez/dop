'use strict';
/**
 * @ngdoc function
 * @name dopApp.controller:AddPaymentMethod
 * @description
 * # AddPaymentModalCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('AddPaymentModalCtrl', function($scope, subscribe, $auth, $http, $mdDialog, $mdToast, SweetAlert, 
                                               CouponFactory, $userService, $paymentService) {
    
    $scope.cardData = {};
    $scope.branch_id = $userService.currentUser.branch_id;
  
    $scope.addCard = function() {
      $scope.cardData = {
        'name': $scope.cardData.name,
        'number': $scope.cardData.number,
        'cvc': $scope.cardData.cvc,
        'exp_month': $scope.cardData.expMonth,
        'exp_year': $scope.cardData.expYear
      };
      
      /* Después de tener una respuesta exitosa, envía la información al servidor */
      var successResponseHandler = function(token) {
        $scope.url = 'http://45.55.7.118:5000/api/company/' + $scope.branch_id +'/payment/method/add';
        $http({
          method: 'POST',
          url: $scope.url,
          data: {
            'token_id': token.id,
            'paymentData': $scope.cardData
          },
          headers: { 'token': $auth.getToken() }
        }).success(function(response) {
          if (response.data == 'success' && subscribe) { $scope.subscribe() }
          if (response.error) { SweetAlert.swal('Error', response.message, 'error'); }
          else {
            $mdToast.show(
              $mdToast.simple()
                .textContent('FELICIDADES! Registraste tu tarjeta con éxito!')
                .position('top right')
                .hideDelay(3500)
                .theme('success-toast')
            );
          }
          $scope.hide();
        });
      };

      /* Después de recibir un error */
      var errorResponseHandler = function(error) {
        SweetAlert.swal('Error', error.message, 'error');
      };

      var tokenParams = { 'card': $scope.cardData };
      Conekta.token.create(tokenParams, successResponseHandler, errorResponseHandler);
    };
  
    $scope.subscribe = function() {
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
  
    $scope.hide = function() {
      $mdDialog.hide();
    };
});