angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('CreditsModalCtrl', function($scope, $auth, $http, $mdDialog, SweetAlert, CouponFactory, $userService, $paymentService) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.doPayment = function(ev) {
      $scope.total = 300;
      $paymentService.setPayment(15, 1, $scope.total, 'campaign');
      $mdDialog.show({
          clickOutsideToClose: false,
          controller: "PaymentModalCtrl",
          templateUrl: "../../views/modalViews/paymentModalView.html",
          targetEvent: ev,
        });
    };

  });
