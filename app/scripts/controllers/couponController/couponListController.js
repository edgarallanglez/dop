'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('CouponListCtrl', function($scope, Restangular, $couponFactory, SweetAlert) {
    godCoupon = $couponFactory();
    $scope.coupons = godCoupon.getAll();

    $scope.delete = function(coupon) {
      SweetAlert.swal({
        title: "Estás seguro?",
        text: "Este cupón sera eliminado para siempre",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F44336",
        confirmButtonText: "Sí, eliminalo!",
        closeOnConfirm: false
      }, 
      function(confirmed){
        if (confirmed) {
          Restangular.one('coupon/' + coupon.coupon_id + '/delete').put().then(function(){
            SweetAlert.swal("se eliminó el son of a bitch!", "yupi");
          });
        }
      });
    }
  });