'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageCtrl
 * @description
 * # ImageCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .service('$imageService', function(){
    this.myImage = '';
    this.myCroppedImage = '';
  })
  .controller('ImageCtrl', function ($scope, $auth, $http, $templateCache, $mdDialog, $imageService) {
    $scope.myImage = $imageService.myImage;
    $scope.myCroppedImage = '';

    var handleLogoSelect=function(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $imageService.myImage = evt.target.result;
          $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'ImageCtrl',
            templateUrl: '../../views/modalViews/imageCropModalView.html',
            targetEvent: 'testing',
          });
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#logoInput')).on('change', handleLogoSelect);

    var handleBannerSelect=function(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $imageService.myImage = evt.target.result;
          $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'ImageCtrl',
            templateUrl: '../../views/modalViews/imageCropModalView.html',
            targetEvent: 'testing',
          });
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#bannerInput')).on('change', handleBannerSelect);

    $scope.$on('$dropletReady', function whenDropletReady() {
      // Directive's interface is ready to be used...
      // $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);

      $scope.$on('$dropletFileAdded', function whenDropletReady() {
        // $mdDialog.show({
        //   clickOutsideToClose: true,
        //   controller: 'ImageCtrl',
        //   templateUrl: '../../views/modalViews/imageCropModalView.html',
        //   targetEvent: 'testing',
        // });
      });
    });
  });
