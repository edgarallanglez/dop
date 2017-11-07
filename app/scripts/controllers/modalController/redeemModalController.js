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
                                            $userService, $socket, $http, $auth, $timeout) {

    $scope.loading = true;
    $scope.reloadButtonFlag = false;
    $scope.users = [];
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.init = function() {
      $scope.loading = true;
      $scope.reloadButtonFlag = false;
      $scope.branch_id = $userService.currentUser.branch_id;
      $socket.emit('waitingForRedeemWebAdmin', {
            branch_id: $scope.branch_id
        });

      $scope.checkUsers();
    };
    
    $socket.on('newUserForWeb', function(response) {
      $scope.loading = false;
      $scope.reloadButtonFlag = false;
      if ($scope.users.length === 0) {
        $scope.users.push(response.data);
      }
      angular.forEach($scope.users, function(value) {
        if (!value.user_id === response.data.user_id) {
          $scope.users.push(response.data);
        }
      });
    });

    $scope.checkUsers = function() {
      $timeout($scope.reloadbutton, 4000);
    }

    $scope.reloadbutton = function() {
      if ($scope.users.length === 0) {
        $scope.loading = false;
        $scope.reloadButtonFlag = true;
      }
    }

    $scope.validate = function(user) {
      if (user.coupon) {
        $http({
          method: 'POST',
          url: 'http://45.55.7.118:5000/api/coupon/user/redeem/by/branch',
          data: {
            'branch_id': $userService.currentUser.branch_id,
            'coupon_id': user.loyalty_id,
            'user_id': user.user_id,
            'branch_folio': ' ',
            'room': $userService.currentUser.branch_id,
          },
          headers: { 'token': $auth.getToken() }
        }).then(function onSuccess(response) {
          if(response.data.message == 'success') { SweetAlert.swal('Success', '¡Listo! Has validado la visita' , 'success'); }
          else if(response.data.message == 'error') { 
            var hours_left = response.data.minutes / 60
            SweetAlert.swal('Error', " hizo válida esta promoción recientemente, faltan "+ hours_left + "\
                            horas para que pueda usarla nuevamente.", 'error'); }
        }).catch(function onError(response) {
          SweetAlert.swal('Error', response.data.message, 'error');
        });
      } else {
        $http({
          method: 'POST',
          url: 'http://45.55.7.118:5000/api/loyalty/user/redeem/by/branch',
          data: {
            'branch_id': $userService.currentUser.branch_id,
            'loyalty_id': user.loyalty_id,
            'user_id': user.user_id,
            'branch_folio': ' ',
            'room': $userService.currentUser.branch_id,
          },
          headers: { 'token': $auth.getToken() }
        }).then(function onSuccess(response) {
          if(response.data.message == 'success') { SweetAlert.swal('Success', '¡Listo! Has validado la visita' , 'success'); }
          else if(response.data.message == 'error') { 
            var hours_left = response.data.minutes / 60
            SweetAlert.swal('Error', " hizo válida esta promoción recientemente, faltan "+ hours_left + "\
                            horas para que pueda usarla nuevamente.", 'error'); }
        }).catch(function onError(response) {
          SweetAlert.swal('Error', response.data.message, 'error');
        });
      }
    };
    
    $scope.init();
  });
