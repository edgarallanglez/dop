'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:CouponMainCtrl
 * @description
 * # CouponMainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('CouponMainCtrl', function($scope, $http, $filter, SweetAlert, $userService, $couponService) {
    //  var selected_coupon = Coupon.getCoupon();
    //  console.log("Cupón seleccionado: "+selected_coupon.name);
    $scope.couponSelected = 1;
    $scope.selectTags = [
      { label: 'Compra X y llevate X', val: 4 },
      { label: 'Descuento', val: 3 },
      { label: 'Bono', val: 2 }
    ];

  	$scope.coupon = {
    //  'startDate': new Date(),
    //  'endDate': new Date(),
      'name':'',
    //  'limit':0,
      'min_spent':0,
      'receives':0,
      'buy':0,
      'percent':0,
      'bond':0,
      'description':'',
      'bond_size': 0,
      'n1':0,
      'n2':0
    };

    $scope.createCoupon = function() {
      var couponInfo = {
        "name": $scope.coupon.name,
        "branch_id": $userService.getCurrentUser().branch_id,
        "min_spent": $scope.coupon.min_spent,
        "description": $scope.coupon.description,
        "coupon_category_id": $scope.couponSelected,
        "coupon_id": $couponService.coupon.coupon_id
      };

      switch($scope.couponSelected) {
        case 2:
          couponInfo.bond_size = $scope.coupon.bond_size;
          break;
        case 3:
          couponInfo.percent = $scope.coupon.percent;
          break;
        case 4:
          couponInfo.n1 = $scope.coupon.receives;
          couponInfo.n2 = $scope.coupon.buy;
          break;
      }

    $http({
        method: 'POST',
        url: 'http://45.55.7.118:5000/api/coupon/customize',
        data: couponInfo,
        headers: {'Content-Type': 'application/json'}
      })
      .catch(function(data, status) {
        SweetAlert.swal("Oops!", "Ha ocurrido un error, intentelo más tarde ", "error");
      })
      .finally(function() {
        SweetAlert.swal("Campaña Creada!", "La campaña ha sido modificado correctamente ", "success");
      })
    };

    $scope.coupon.coupon_category_id = 2;


    $scope.$watch(function(){
      return $couponService.coupon;
    }, function (flag) {
        if (flag) {
          $scope.coupon = $couponService.coupon;
          $scope.couponSelected = $scope.coupon.coupon_category_id
          $scope.inSet = $couponService.inSet;
        }
    });

  });
