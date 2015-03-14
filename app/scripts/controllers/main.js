'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.data = {
      title: 'Aqui va el Dashboard con graficas'
    };
  })
  .controller('navegacion', ['$scope','$document', function(sc,dc) {
    sc.click = function(){
        sc.open=true;
    }
    dc.bind('click', function(event){
        sc.open = false;
    });
  }])
  

  