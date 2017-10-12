'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:AddCreditModalCtrl
 * @description
 * # AddCreditModalCtrl
 * Controller of the dopApp
 */

angular.module('dopApp')
  .controller('RedeemModalCtrl', function ($scope, $mdDialog, SweetAlert, CouponFactory,
                                            $userService, $socket, $http, $auth) {
    $scope.users = [];
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.init = function() {
      $scope.branch_id = $userService.currentUser.branch_id;
      $socket.emit('waitingForRedeemWebAdmin', {
            branch_id: $scope.branch_id
        });
    };
    
    $socket.on('newUserForWeb', function(response) {
      $scope.users.push(response.data);
    });
    
    $scope.validate = function() {
      
    };
    
    $scope.init();
  });
