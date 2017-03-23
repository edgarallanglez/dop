'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .service('$reportService', function() {
    this.isInView = false;
    this.reportData = {
      'name': '',
      'beginDate': new Date(),
      'endDate': new Date(),
      'type': 'default',
      'category': {
        'sales': false,
        'detailed': false,
        'profit': false
      }
    };

    this.setInView = function(currentStatus) {
      this.isInView = currentStatus;
    };

    this.getInView = function(){
      return this.isInView;
    };

    this.setReportData = function(key, value) {
      this.reportData[key] = value;
    };
  })
  .config(function($stateProvider){
    $stateProvider
      // HOME STATES AND NESTED VIEWS ========================================
      .state('report.basicReport', {
        url: '/basic',
        templateUrl: '../../views/reportViews/basicReportView.html',
        controller: 'BasicReportCtrl'
      })
      .state('report.middleReport', {
        url: '/middle',
        templateUrl: '../../views/reportViews/middleReportView.html',
        controller: 'MiddleReportCtrl'
      })
      .state('report.advanceReport', {
        url: '/advance',
        templateUrl: '../../views/reportViews/advanceReportView.html',
        controller: 'AdvanceReportCtrl'
      });
  })
  .controller('ReportCtrl', function ($scope, $state, $reportService, $mdSidenav, $log, $userService, $http, $mdDialog, $mdMedia) {
    $scope.reportData = $reportService.reportData;
    $scope.empty = true;
    $scope.selected = [];




    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

    function success(desserts) {
      $scope.desserts = desserts;
    }

    $scope.getCoupons = function () {
      //$scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
    };
    $scope.toggleRight = function (current) {
      $mdSidenav('reportData').open()
                          .then(function(){
                            $scope.reportData['type'] = current;
                          });
    };

    $scope.createReport = function (kindReport) {
      $log.debug($scope.reportData);
    };

    var branch_id = $userService.getCurrentUser().branch_id;

    $http({
      method: 'GET',
      url: 'http://45.55.7.118:5000/api/coupon/all/'+ branch_id + '/get',
    }).success(function(data) {
      if (data.data.length === 0) { $scope.empty = true; }
      else { $scope.empty = false; }
      angular.forEach(data.data, function(value, key){
          if(value.name === null){
            value.name = "Nueva Campaña";
          }
      });

      //pdf.save('Test.pdf');

      /*doc.text(20, 20, 'Hello world.');*/
      $scope.coupons = data;

      console.log($scope.coupons);

    }).error(function(){
      //SweetAlert.swal("Error al cargar cupones, porfavor refresque la pagina", "", "error");
    });

    $scope.getPDF = function() {
      var pdf = jsPDF('p', 'pt');

      var myTables = pdf.autoTableHtmlToJson(document.getElementById('table'));

      pdf.autoTable(myTables.columns, myTables.data, {startY: 60, theme:'striped'});
      
      pdf.save('Test.pdf') ;
    };

    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    $scope.showAdvanced = function(item) {
      var useFullScreen = $scope.customFullscreen;
      $mdDialog.show({
        controller: 'ReportPreviewCtrl',
        templateUrl: 'views/reportViews/reportPreview.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
        locals: {
            coupon : item
        }
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };
  });
