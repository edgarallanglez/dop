'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
    .service('$couponService', function() {
    this.inSet = false;
    this.coupon = {};

    this.setCoupon = function(coupon) {
        this.coupon = coupon;
    }
})
    .controller('CouponListCtrl', function($scope, $http, Restangular, SweetAlert, CouponFactory,
                                             $userService, $couponService, $lastCouponService, $mdDialog) {
    var godCoupon = new CouponFactory();
    var branch_id = $userService.getCurrentUser().branch_id;
    $scope.loading = true;

    $http({
        method: 'GET',
        url: 'http://45.55.7.118:5000/api/coupon/all/'+ branch_id + '/get',
    }).success(function(data){
        $scope.coupons = data;
        if ($scope.coupons.data.length === 0) { $scope.empty = true; }
        else { $scope.empty = false; }
        $scope.loading = false;
    }).error(function(){
        SweetAlert.swal("Error al cargar cupones, porfavor refresque la pagina", "", "error")
    });

    $scope.dateFormat = function(stringDate) {
        if (stringDate) { $scope.formattedDate = new Date(stringDate); }
    }

    $scope.activeCoupon = function(coupon_id){
      window.event.stopPropagation();
      
      $http({
        method: 'PUT',
        url: 'http://45.55.7.118:5000/api/coupon/active/' + coupon_id,
        headers: { 'Authorization': $auth.getToken() }
        })
        .catch(function(data, status) {
          SweetAlert.swal("Oops!", "Ha ocurrido un error, intentelo más tarde ", "error");
        })
        .finally(function() {
          $mdToast.show(
                $mdToast.simple()
                  .textContent('CAMPAÑA ACTIVADA')
                  .position('top right')
                  .hideDelay(3500)
                  .theme('success-toast')
              );
          $state.reload();
        })
    };

    $scope.showConfigModal = function(promo) {
      //$lastCouponService.getCoupon().coupon_id = null;
      if (!promo.active) {
  		$couponService.coupon = promo;
        $mdDialog.show({
          clickOutsideToClose: true,
          controller: 'CouponMainCtrl',
          templateUrl: '../../views/couponViews/couponMainView.html',
          targetEvent: promo,
        }).then(function(answer) {
          SweetAlert.swal('Cancelado', 'Tu configuración ha sido cancelada :)', 'error');
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
      } else {
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
            var start_date = new Date(promo.start_date);
            var end_date = new Date(promo.end_date);

            $http({
              method: 'PUT',
              url: 'http://45.55.7.118:5000/api/coupon/deactivate/'+promo.coupon_id,
              headers: {'Authorization': $auth.getToken()}
            }).catch(function(data, status) {
              $lastCouponService.getCoupon().coupon_id = null;
              $mdDialog.hide();
            }).finally(function() {
              $lastCouponService.getCoupon().coupon_id = null;

              $mdDialog.hide();
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
