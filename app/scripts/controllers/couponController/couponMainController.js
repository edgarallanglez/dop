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
    //var selected_coupon = Coupon.getCoupon();
   // console.log("Cupón seleccionado: "+selected_coupon.name);
    $scope.couponSelected = 1;
    $scope.selectTags = [{
        'label': 'Compra X y llevate X',
        'val': 4 
      },
      { 
        'label': 'Descuento',
        'val': 3
      },
      {
        'label': 'Bono',
        'val': 2
    }];
  	$scope.coupon = { 
      'startDate': new Date(), 
		  'endDate': new Date(), 
      'name':'', 
      'limit':0,
      'min_spent':0,
      'receives':0,
      'buy':0,
      'discount':0,
      'bond':0,
      'description':'',
      'bond_size': 0
    };

    $scope.createCoupon = function() {
      var couponInfo = {
        "name": $scope.coupon.name,
        "branch_id": $userService.getCurrentUser().branch_id,
        "start_date": $filter('date')($scope.coupon.startDate,'MM-dd-yyyy'),
        "end_date": $filter('date')($scope.coupon.endDate,'MM-dd-yyyy'),
        "min_spent": $scope.coupon.min_spent,
        "limit": $scope.coupon.limit,
        "description": $scope.coupon.description,
        "coupon_category_id": $scope.couponSelected,
        "coupon_id": $couponService.coupon.coupon_id
      };

      var createCouponUrl = 'http://45.55.7.118:5000/api/coupon/';

      switch($scope.couponSelected) {
        case 2:
          couponInfo.bond_size = $scope.coupon.bond_size;
          createCouponUrl += "bond/create";
          break;
        case 3:
          couponInfo.discount = $scope.coupon.discount;
          createCouponUrl += "discount/create";
          break;
        case 4:
          couponInfo.n1 = $scope.coupon.receives;
          couponInfo.n2 = $scope.coupon.buy;
          createCouponUrl += "nxn/create";
          break;
      }
      
      $http({
        method: 'POST',
        url: createCouponUrl,
        data: couponInfo,
        headers: {'Content-Type': 'application/json'}
      })
      .catch(function(data, status) {
        SweetAlert.swal("Oops!", "Ha ocurrido un error, intentelo más tarde ", "error");
      })
      .finally(function() {
        SweetAlert.swal("Cupón Creado!", "El cupón ha sido creado correctamente ", "success");
      })
    };

    $scope.$watch(function(){
      return $couponService.coupon;
    }, function (flag) {
        if (flag) {
          $scope.coupon = $couponService.coupon;
          $scope.inSet = $couponService.inSet;
        }
    });

  });