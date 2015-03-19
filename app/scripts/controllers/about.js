'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    this.message = "InMoon Design, hasta la luna y más allá";
  });
