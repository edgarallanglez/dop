'use strict';
/**
 * @ngdoc function
 * @name dopApp.controller:CouponCtrl
 * @description
 * # CouponCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
	.config(function($stateProvider){
    $stateProvider
      // HOME STATES AND NESTED VIEWS ========================================
      .state('coupon.list', {
        views: {
          // the child views will be defined here (absolutely named)
          'coupon-list-view': {
            templateUrl: '../../views/couponViews/couponListView.html',
            controller: 'CouponListCtrl'
          },
          'coupon-main-view': {
            templateUrl: '../../views/couponViews/couponMainView.html',
            controller: 'CouponMainCtrl'
          }
        }
      });
  })
  .controller('CouponCtrl', function ($scope, $state, $mdDialog, SweetAlert, $couponService, $http) {
    $state.go('coupon.list');
    $scope.showModal = function(ev) {

      $mdDialog.show({
        clickOutsideToClose: false,
        controller: 'PricingModalCtrl',
        templateUrl: '../../views/modalViews/pricingModalView.html',
        targetEvent: ev,
      })

      .then(function(answer) {
        //SweetAlert.swal("Cancelado", "Tu compra ha sido cancelada :)", "error");
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };

    $scope.activeCoupon = function(coupon_id){
      window.event.stopPropagation();
      
      $http({
        method: 'PUT',
        url: 'http://45.55.7.118:5000/api/coupon/active/'+coupon_id,
        headers: {'Content-Type': 'application/json'}
        })
        .catch(function(data, status) {
          SweetAlert.swal("Oops!", "Ha ocurrido un error, intentelo más tarde ", "error");
        })
        .finally(function() {
          SweetAlert.swal("Campaña Publicada!", "La campaña ha sido activada", "success");
          $state.reload();
        })
    };



    $scope.showConfigModal = function(promo) {
			$couponService.coupon = promo;
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'CouponMainCtrl',
        templateUrl: '../../views/couponViews/couponMainView.html',
        targetEvent: promo,
      })
      .then(function(answer) {
        SweetAlert.swal('Cancelado', 'Tu compra ha sido cancelada :)', 'error');
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };
  });
