'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageLogoCtrl
 * @description
 * # ImageLogoCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')

  .controller('ImageLogoCtrl', function ($scope, $auth, $http, $templateCache, $mdDialog, $imageService, $fileUploadService) {
    $scope.aspectRatio = $imageService.aspectRatio;
    $scope.myImage = $imageService.myImage;
    $scope.myCroppedImage = '';
    $scope.cropType = $imageService.cropType;

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
            controller: 'ImageLogoCtrl',
            templateUrl: '../../views/modalViews/imageCropModalView.html',
            targetEvent: 'testing',
          });
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#logoInput')).on('change', handleLogoSelect);

    $scope.$watch(function() {
      return $imageService.myLogoCroppedImage;
    }, function(myCroppedImage) {
      $scope.myLogoCroppedImage = myCroppedImage;
    });

    $scope.doCrop = function() {
      if ($imageService.cropType === 'square') { $imageService.myLogoCroppedImage = $scope.myCroppedImage; }
      else { $imageService.myBannerCroppedImage = $scope.myCroppedImage; }

      $scope.hide();

      var uploadUrl = 'http://45.55.7.118:5000/api/company/branch/4/upload/logo';
      console.log($imageService.myLogoCroppedImage);
      $fileUploadService.uploadFileToUrl($imageService.myBannerCroppedImage, uploadUrl, {})
      .then(function(resp) {
          console.log(resp);
      });
    };

    $scope.hide = function() {
      $mdDialog.cancel();
    };
  });
