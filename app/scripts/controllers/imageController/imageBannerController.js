'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageBannerCtrl
 * @description
 * # ImageBannerCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .service('$bannerLoading', function(){
    this.flag = false;
  })
  .service('$bannerUploading', function(){
    this.flag = false;
  })
  .directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageonload);
            });
        }
      };
  })
  .controller('ImageBannerCtrl', function ($scope, $auth, $http, $templateCache, $mdDialog, $imageService, $fileUploadService, $bannerLoading, Cropper, $timeout, $userService, $bannerUploading) {
    $scope.minSize = $imageService.minSize;
    $scope.resultSize = $imageService.resultSize;

    $scope.aspectRatio = $imageService.aspectRatio;
    $scope.myImage = $imageService.myImage;
    $scope.myCroppedImage = '';
    $scope.cropType = $imageService.cropType;


    $scope.loadingBanner = $bannerLoading.flag;
    $scope.isBannerUploading = $bannerUploading.flag;

    $scope.data;
    $scope.cropper = {};
    $scope.cropperProxy = 'cropper.first';


    $scope.options = {
          maximize: true,
          aspectRatio:  2.11,
          dragMode: 'move',
          crop: function(dataNew) {
            $scope.data = dataNew;

          }
    };

    var companyId = $userService.currentUser.company_id;
    $imageService.myBannerCroppedImage = 'http://45.55.7.118/branches/images/'+companyId+'/banner.png'+'?' + new Date().getTime();;
    $bannerLoading.flag = true;

    $scope.showInvoice = function() {
      $scope.bannerLoaded = true;
      $bannerLoading.flag = false;
    };

    $scope.showEvent = 'show';
    $scope.hideEvent = 'hide';
    function showCropper() { $scope.$broadcast($scope.showEvent); }
    function hideCropper() { $scope.$broadcast($scope.hideEvent); }

    $timeout(showCropper);

    $scope.$watch(function(){
      return $bannerLoading.flag;
    }, function(flag){
      $scope.loadingBanner = flag;
    });

    $scope.$watch(function(){
      return $bannerUploading.flag;
    }, function(flag){
      $scope.isBannerUploading = flag;
    });

    var handleBannerSelect=function(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.minSize = 50;
          $scope.resultSize = 1224;

          $imageService.myImage = evt.target.result;
          $imageService.file = file;
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
      $bannerUploading.flag = true;

      Cropper.crop($imageService.file,$scope.data)
        .then(Cropper.encode).then(function(dataUrl) {
          $imageService.myBannerCroppedImage = dataUrl;
          $scope.hide();

          $fileUploadService.uploadFileToUrl(dataUrl, $imageService.cropType)
            .then(function(resp) {
              $bannerUploading.flag = false;
            });
        });
    };

    $scope.hide = function() {
      $mdDialog.cancel();
    };
  });
