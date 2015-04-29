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
  .controller('CouponListCtrl', function($scope, Restangular, $http, SweetAlert) {
    Restangular.all('coupon/all/get').getList()
    .then(function(data){
      $scope.coupons = data;
    });

    $scope.delete = function(coupon) {
      SweetAlert.swal({
         title: "Are you sure?",
         text: "Your will not be able to recover this imaginary file!",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "Yes, delete it!",
         closeOnConfirm: false}, 
      function(confirmed){
        if (confirmed) {
          Restangular.one('coupon/' + coupon.coupon_id + '/delete').put();
          SweetAlert.swal("se eliminó el son of a bitch!", "success");
        }
      });
    }
  });