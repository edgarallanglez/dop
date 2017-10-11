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
    };
    this.setCoupon = function(coupon){
       this.coupon = coupon;
    };
  })
  .controller('LastCouponListWidgetCtrl', function($scope, $http, $userService, CouponFactory,
                                                    $lastCouponService, $state, $location, $auth, $mdToast) {
    $scope.loading = true;

    $scope.select = function(coupon) {
      $lastCouponService.setCoupon(coupon);
      $state.go('coupon');
      $location.path('/coupon').replace();
    }

    $scope.activateCoupon = function(coupon_id) {
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
        });
    }


    $scope.export_action = 'pdf';

    $scope.exportAction = function(){
      var element = angular.element( document.querySelector( '#report-table' ) );
      element.tableExport({type:'pdf', escape: 'false', fileName:'reporte'});
    };

     /*$http({
       method: 'GET',
       url: 'http://45.55.7.118:5000/api/report/uses/'+ 11,
     }).then(function(data){
       $scope.report_rows = data.data.data;
       console.log($scope.report_rows);
     });*/

    var branch_id = $userService.getCurrentUser().branch_id;
    $http({
      method: 'GET',
      url: 'http://45.55.7.118:5000/api/coupon/latest/stats/' + branch_id,
    }).then(function(data){
      // console.log(data.data);
      $scope.coupons = data.data;
      $scope.loading = false;
    });
  });
