'use strict';
/**
 * @ngdoc function
 * @name dopApp.controller:PaymentController
 * @description
 * # PaymentController
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('PaymentModalCtrl', function($scope, $auth, $http, $mdDialog, SweetAlert, CouponFactory, $userService, $paymentService) {
    $scope.cardData = {}
    $scope.months = [
      { 'month': '01' }, 
      { 'month': '02' }, 
      { 'month': '03' }, 
      { 'month': '04' }, 
      { 'month': '05' }, 
      { 'month': '06' }, 
      { 'month': '07' }, 
      { 'month': '08' }, 
      { 'month': '09' }, 
      { 'month': '10' }, 
      { 'month': '11' }, 
      { 'month': '12' }
    ];

    $scope.years = [
      { 'year': '2015' }, 
      { 'year': '2016' }, 
      { 'year': '2017' }, 
      { 'year': '2018' }, 
      { 'year': '2019' }, 
      { 'year': '2020' }, 
      { 'year': '2021' }, 
      { 'year': '2022' }, 
      { 'year': '2023' }, 
      { 'year': '2024' }, 
      { 'year': '2025' }, 
      { 'year': '2026' }
    ];
    $scope.sendPayment = function() {
      $scope.cardData = {
        'name': $scope.cardData.name,
        'number': $scope.cardData.number,
        'cvc': $scope.cardData.cvc,
        'exp_month': $scope.cardData.expMonth,
        'exp_year': $scope.cardData.expYear
      }
      /* Después de tener una respuesta exitosa, envía la información al servidor */
      var successResponseHandler = function(token) {
        $http({
          method: 'POST',
          url: 'http://104.236.141.44:5000/api/coupon/payment/card',
          data: {
            'token_id':token.id,
            'paymentData': $paymentService.getPaymentData()
          },
          headers: { 'token': $auth.getToken() }
        }).success(function(message){
          console.log(message)
        });
      };

      /* Después de recibir un error */
      var errorResponseHandler = function(error) {
        SweetAlert.swal("Error", error.message, "error");
      };

      var tokenParams = { 'card': $scope.cardData }
      Conekta.token.create(tokenParams, successResponseHandler, errorResponseHandler);
    }
  })