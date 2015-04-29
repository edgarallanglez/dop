'use strict';

/**
 * @ngdoc overview
 * @name dopApp
 * @description
 * dopApp
 *
 * Coupon model.
 */
angular.module('dopApp')
  .controller('CouponProvider', function($scope, Restangular) {
    var coupons = Restangular.all('coupon/all/get');
  })