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
  .controller('ReportCtrl', function ($scope, $state, $reportService, $mdSidenav, $log, $userService, $http) {
    $scope.reportData = $reportService.reportData;

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
      angular.forEach(data.data, function(value, key){
        console.log(value.name);
          if(value.name == null){
            value.name = "Nueva Campaña";
          }
      });
      $scope.coupons = data;
    }).error(function(){
      SweetAlert.swal("Error al cargar cupones, porfavor refresque la pagina", "", "error");
    });


    // $scope.close = function() {
    //   $mdSidenav('right').close()
    //                       .then(function(){

    //                       });
    // };

  });
