'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:CouponWidgetCtrl
 * @description
 * # CouponWidgetCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('CouponWidgetCtrl', function($scope, $userService, $mdDialog) {
    var branch_id = $userService.getCurrentUser().branch_id;
    $scope.pro = $userService.currentUser.pro;
    $scope.payment_method = $userService.payment_sources;
    $scope.loading = true;
  
    $scope.data = {
      selectedIndex : 0,
      secondLabel : "Item Two"
    };

    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };

    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
    
    $scope.showProModal = function (ev) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'BecomeProModalCtrl',
        templateUrl: '../views/modalViews/becomeProModalView.html',
        targetEvent: ev,
      });
    };
  });