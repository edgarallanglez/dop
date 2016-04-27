'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageCropperCtrl
 * @description
 * # ImageCropperCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')

  .controller('ImageCropperCtrl', function ($scope, $auth, $http, $templateCache, $mdDialog, $imageService) {
    $scope.doCrop = function() {
        $imageService.myCroppedImage = $scope.myCroppedImage;
    };
  });
