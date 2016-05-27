'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageAboutCtrl
 * @description
 * # ImageAboutCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .service('$aboutService', function() {
    this.about = {
      name: '',
      phone: '',
      description: ''
    };

    this.setAbout = function(item) {
     this.about = item;
   };
  })
  .controller('ImageAboutCtrl', function($aboutService, $scope) {
    $scope.about = {
      name: 'zara',
      description: 'hola hola',
      phone: '6672207920'
    };

    $scope.$watch(function() {
      return $scope.about;
    }, function (about) {
       $aboutService.setAbout(about);
    });
  });
