'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageBannerCtrl
 * @description
 * # ImageBannerCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')

  .controller('ImageBannerCtrl', function ($scope, $auth, $http, $templateCache, $mdDialog, $imageService, $fileUploadService) {
    $scope.aspectRatio = $imageService.aspectRatio;
    $scope.myImage = $imageService.myImage;
    $scope.myCroppedImage = '';
    $scope.cropType = $imageService.cropType;

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
            controller: 'ImageBannerCtrl',
            templateUrl: '../../views/modalViews/imageCropModalView.html',
            targetEvent: 'testing',
          });
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#bannerInput')).on('change', handleBannerSelect);

    $scope.$watch(function() {
      return $imageService.myBannerCroppedImage;
    }, function(myCroppedImage) {
      $scope.myBannerCroppedImage = myCroppedImage;
    });

    $scope.doCrop = function() {
      if ($imageService.cropType === 'square') { $imageService.myLogoCroppedImage = $scope.myCroppedImage; }
      else { $imageService.myBannerCroppedImage = $scope.myCroppedImage; }

      $scope.hide();
      $fileUploadService.uploadFileToUrl($imageService.myBannerCroppedImage, uploadUrl, {})
      .then(function(resp) {
          console.log(resp);
      });
    };

    $scope.hide = function() {
      $mdDialog.cancel();
    };
  });
