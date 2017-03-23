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
  .controller('CouponCtrl', function ($scope, $state, $mdDialog, SweetAlert, $couponService, $http, $lastCouponService, $mdToast, $auth) {
    $state.go('coupon.list');
    $scope.showModal = function(ev) {

      $mdDialog.show({
        clickOutsideToClose: false,
        controller: 'PricingModalCtrl',
        templateUrl: '../../views/modalViews/pricingModalView.html',
        targetEvent: ev
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
        headers: {'Authorization': $auth.getToken()}
        })
        .catch(function(data, status) {
          SweetAlert.swal("Oops!", "Ha ocurrido un error, intentelo más tarde ", "error");
        })
        .finally(function() {
          $mdToast.show(
                $mdToast.simple()
                  .textContent('CAMPAÑA ACTIVADA.')
                  .position('top right')
                  .hideDelay(3500)
                  .theme('success-toast')
              );
          $state.reload();
        })
    };

    
    $scope.showConfigModal = function(promo) {
      //$lastCouponService.getCoupon().coupon_id = null;
      if(!promo.active){
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
      }else{
        var confirm = $mdDialog.confirm()
        .title('¡HEY!')
        .textContent('No puedes configurar una campaña que se encuentra activa.')
        .ariaLabel('Lucky day')
        .ok('DESACTIVAR')
        .cancel('CANCELAR');
        $mdDialog.show(confirm).then(function() {
          var deactivate = $mdDialog.confirm()
          .title('DESACTIVAR')
          .textContent('Estas a punto de desactivar la campaña, ¿Estás seguro?')
          .ariaLabel('Lucky day')
          .ok('ACEPTAR')
          .cancel('CANCELAR');
          $mdDialog.show(deactivate).then(function() {

            var start_date =new Date(promo.start_date);
            var end_date =new Date(promo.end_date);

            $http({
            method: 'PUT',
            url: 'http://45.55.7.118:5000/api/coupon/deactivate/'+promo.coupon_id,
            headers: {'Authorization': $auth.getToken()}
            })
            .catch(function(data, status) {
              $lastCouponService.getCoupon().coupon_id = null;

              console.log(data);
              $mdDialog.hide();
            })
            .finally(function() {
              $lastCouponService.getCoupon().coupon_id = null;

              $mdDialog.hide();
              //var diff = newDate(Math.abs(end_date - start_date));
              $mdToast.show(
                $mdToast.simple()
                  .textContent('CAMPAÑA DESACTIVADA.')
                  .position('top right')
                  .hideDelay(3500)
                  .theme('success-toast')
              );
              $state.reload();
            })
          });

        }, function() {
          $lastCouponService.getCoupon().coupon_id = null;
        });
      }
    };
  });
