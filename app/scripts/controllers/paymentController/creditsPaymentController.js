'use strict';

angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('CreditsModalCtrl', function($scope, $auth, $http, $mdDialog, $mdToast, SweetAlert, CouponFactory, $userService, $paymentService) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.branch_id = $userService.currentUser.branch_id;
    $scope.doPayment = function(ev) {
      $mdDialog.show({
          clickOutsideToClose: false,
          controller: "PaymentModalCtrl",
          templateUrl: "../../views/modalViews/paymentModalView.html",
          targetEvent: ev,
        });
    };

    $scope.doCreditsPayment = function(ev) {
      $scope.total = $paymentService.paymentData.total;
      $scope.total_label = $scope.total / 100;

      console.log($userService.currentUser.credits);
      // Bonus calculation.
      var bonus;

      if ($scope.total >= 100000 && $scope.total < 200000) { bonus = $scope.total * 0.1; }
      if ($scope.total >= 200000 && $scope.total < 500000) { bonus = $scope.total * 0.25; }
      if ($scope.total >= 500000) { bonus = $scope.total * 0.4; }
      $scope.url = 'http://45.55.7.118:5000/api/coupon/'+$scope.branch_id+'/credits/payment';

      var confirm = $mdDialog.confirm()
      .title('¡HEY!')
      .textContent('Se descontarán '+$scope.total_label+' de tus '+$userService.currentUser.credits+' créditos disponibles.')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('COMPRAR')
      .cancel('CANCELAR');
      $mdDialog.show(confirm).then(function() {
        $scope.status = 'COMPRADO';
        $http({
          method: 'POST',
          url: $scope.url,
          data: { 'paymentData': $paymentService.getPaymentData() },
          headers: { 'token': $auth.getToken() }
        }).success(function(message) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('FELICIDADES! TIENES UNA NUEVA CAMPAÑA.')
              .position('top right')
              .hideDelay(3500)
              .theme('success-toast')
          );
          $userService.currentUser.credits = message.balance;
        }).error(function(message) {
          console.log(message);
        });
      }, function() {
        $scope.status = 'CANCELADO';
        $mdDialog.show({
            clickOutsideToClose: false,
            controller: 'CreditsModalCtrl',
            templateUrl: '../../views/modalViews/creditsModalView.html',
            targetEvent: ev,
          });
      });
  };


  });
