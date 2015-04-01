'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
    // $stateProvider
    //   .state('/', {
    //       views: {
    //         "genderChart": { template: "../views/dashboardViews/genderView.html" }
    //       }
    //     });
  })
  .controller('MainCtrl', ['$scope', function(scope) {
    scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  
  }])


  