angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('CreditsModalCtrl', function($scope, $auth, $http, $mdDialog, SweetAlert, CouponFactory, $userService, $paymentService) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.doPayment = function(ev) {
      console.log($paymentService.paymentData);
      $mdDialog.show({
          clickOutsideToClose: false,
          controller: "PaymentModalCtrl",
          templateUrl: "../../views/modalViews/paymentModalView.html",
          targetEvent: ev,
        });
    };

    $scope.doCreditsPayment = function(ev) {
      
    }
  });
