'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:AddCreditModalCtrl
 * @description
 * # AddCreditModalCtrl
 * Controller of the dopApp
 */

angular.module('dopApp')
  .config(function ($stateProvider) {
  
  })
  .factory('$socket', function (socketFactory) {
      return socketFactory({
        prefix: 'foo~',
        ioSocket: io.connect('http://45.55.7.118')
      });
  })
  .controller('RedeemModalCtrl', function ($scope, $mdDialog, SweetAlert, CouponFactory,
                                            $userService, $socket, $http, $auth) {
    
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.showModal = function() {
      $scope.branch_id = $userService.currentUser.branch_id;
      $socket.emit('waitingForRedeemWebAdmin', {
            branch_id: $scope.branch_id
        });
    };
    
    $socket.on('newUser', function(response) {
      console.log(response);
    })

  });
