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
    }

    this.setInView = function(currentStatus) {
      this.isInView = currentStatus;
    }

    this.getInView = function(){
      return this.isInView;
    }

    this.setReportData = function(key, value) {
      this.reportData[key] = value;
    }
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
  .controller('ReportCtrl', function ($scope, $state, $reportService, $mdSidenav, $log) {
    $scope.reportData = $reportService.reportData;

    $scope.toggleRight = function (current) {
      $mdSidenav('reportData').open()
                          .then(function(){
                            $scope.reportData['type'] = current;
                          });
    };

    $scope.createReport = function (kindReport) {

      $log.debug($scope.reportData);
      
    };

    // $scope.close = function() {
    //   $mdSidenav('right').close()
    //                       .then(function(){
                           
    //                       });
    // };

  });
