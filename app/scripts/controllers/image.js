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
    this.myLogoCroppedImage = '';
    this.myBannerCroppedImage = '';
    this.cropType = 'square';
    this.aspectRatio = 1.0;
  })
  .controller('ImageCtrl', function ($scope, $auth, $http, $templateCache, $mdDialog, $imageService, location) {
    $scope.aspectRatio = $imageService.aspectRatio;
    $scope.myImage = $imageService.myImage;
    $scope.myCroppedImage = '';
    $scope.cropType = $imageService.cropType;

    location.get(angular.noop, angular.noop);
    $scope.isModalVisible = false;


    var handleLogoSelect=function(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $imageService.myImage = evt.target.result;
          $imageService.cropType = 'square';
          $imageService.aspectRatio = 1.0;
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
          $imageService.cropType = 'rectangle';
          $imageService.aspectRatio = 2.105;
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
        //
        // $mdDialog.show({
        //   clickOutsideToClose: true,
        //   controller: 'ImageCtrl',
        //   templateUrl: '../../views/modalViews/imageCropModalView.html',
        //   targetEvent: 'testing',
        // });
      });
    });

    $scope.$watch(function() {
      return $imageService.myLogoCroppedImage;
    }, function(myCroppedImage) {
      $scope.myLogoCroppedImage = myCroppedImage;
    });


    $scope.$watch(function() {
      return $imageService.myBannerCroppedImage;
    }, function(myCroppedImage) {
      $scope.myBannerCroppedImage = myCroppedImage;
    });

    $scope.doCrop = function() {
      if ($imageService.cropType === 'square') { $imageService.myLogoCroppedImage = $scope.myCroppedImage; }
      else { $imageService.myBannerCroppedImage = $scope.myCroppedImage; }

      $scope.hide();
    };

    $scope.hide = function() {
      $mdDialog.cancel();
    };

    $scope.locator = function() {
      console.log('locator');
    }
    $scope.toggleModal = function() {
      console.log(lookedUpLocation);
    };
    
    $scope.$watch('lookedUpLocation', $scope.toggleModal);
  });
