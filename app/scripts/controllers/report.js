'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
      $stateProvider
          // HOME STATES AND NESTED VIEWS ========================================
          .state('report.layout', {
            views: {
                // the child views will be defined here (absolutely named)
                'basicReport': {
                  templateUrl: '../../views/reportViews/basicReportView.html',
                  controller: 'BasicReportCtrl'
                },
                'middleReport': {
                  templateUrl: '../../views/reportViews/middleReportView.html',
                  controller: 'MiddleReportCtrl'
                },
                'advanceReport': {
                  templateUrl: '../../views/reportViews/advanceReportView.html',
                  controller: 'AdvanceReportCtrl'
                }
            }
          });
  })
  .controller('ReportCtrl', function ($scope, $state) {
    $state.transitionTo('report.layout');
  });
