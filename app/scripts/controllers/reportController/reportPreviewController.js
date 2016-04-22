'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ReportPreviewCtrl
 * @description
 * # ReportPreviewCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('ReportPreviewCtrl', function($scope, $http, $userService, $mdDialog, locals) {
    $scope.loading = true;
    $scope.coupon = locals.coupon;


    var branch_id = $userService.getCurrentUser().branch_id;

    $http({
      method: 'GET',
      url: 'http://45.55.7.118:5000/api/report/uses/'+ locals.coupon.coupon_id ,
    }).success(function(data) {
      $scope.loading = false;
      $scope.coupons = data;



    });
    $scope.getPDF = function() {
      var pdf = jsPDF('p', 'pt');
      var myTables = pdf.autoTableHtmlToJson(document.getElementById('preview_table'));
      delete myTables.data[0]
      pdf.autoTable(myTables.columns, myTables.data,
        {startY: 70, theme:'striped',
          beforePageContent: function(data) {
            pdf.setTextColor(40);
            pdf.setFontStyle('normal');


            var name = $scope.coupon.name;
            var xOffset = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(name) * pdf.internal.getFontSize() / 2);
            var available = 'Cupones disponibles: '+ $scope.coupon.available;
            var remaining = 'Dias restantes: '+ $scope.coupon.available;

            var diffDays = $scope.coupon.end_date - $scope.coupon.start_date;
            alert(diffDays)

            console.log($scope.coupon);

            pdf.setFontSize(12);
            pdf.text(name, xOffset, 28);
            pdf.text(available, 40, 45);
            pdf.text(remaining, 40, 60);
          }
      });


      pdf.save($scope.coupon.name);

      $mdDialog.hide();
    };

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  });
