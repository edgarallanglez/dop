'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:LastCouponListCtrl
 * @description
 * # LastCouponListCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .service('$lastCouponService', function() {
    this.coupon = {};
    this.getCoupon = function () {
        return this.coupon;
    }
    this.setCoupon = function(coupon){
       this.coupon = coupon;
    }
  })
  .controller('LastCouponListWidgetCtrl', function($scope, $http, $userService, CouponFactory, $lastCouponService, $state) {
    $scope.loading = true;
    $scope.select = function(coupon) {
      $lastCouponService.setCoupon(coupon);
      $state.go('coupon');
    }

    $scope.export_action = 'pdf';

    $scope.exportAction = function(){
      var element = angular.element( document.querySelector( '#report-table' ) );
      element.tableExport({type:'pdf', escape: 'false', fileName:'reporte'});
     }

     $http({
       method: 'GET',
       url: 'http://45.55.7.118:5000/api/report/uses/'+ 11,
     }).then(function(data){
       $scope.report_rows = data.data.data;
       console.log($scope.report_rows);
     });

    var branch_id = $userService.getCurrentUser().branch_id;
    $http({
      method: 'GET',
      url: 'http://45.55.7.118:5000/api/coupon/latest/stats/'+ branch_id,
    }).then(function(data){
      $scope.coupons = data.data;
      $scope.loading = false;
    });

  });
