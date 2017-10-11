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

  });
