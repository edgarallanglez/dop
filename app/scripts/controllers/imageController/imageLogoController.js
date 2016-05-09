'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageLogoCtrl
 * @description
 * # ImageLogoCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .service('$logoLoading', function(){
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
  .controller('ImageLogoCtrl', function ($scope, $auth, $http, $templateCache, $mdDialog, $imageService, $fileUploadService, $logoLoading, Cropper, $timeout, $userService) {
    $scope.minSize = $imageService.minSize;
    $scope.resultSize = $imageService.resultSize;

    $scope.aspectRatio = $imageService.aspectRatio;
    $scope.myImage = $imageService.myImage;
    $scope.myCroppedImage = '';
    $scope.cropType = $imageService.cropType;


    $scope.loadingLogo = $logoLoading.flag;

    $scope.data;
    $scope.cropper = {};
    $scope.cropperProxy = 'cropper.first';



    $scope.options = {
          maximize: false,
          aspectRatio: 1 / 1,
          dragMode: 'move',
          crop: function(dataNew) {
            $scope.data = dataNew;

          }
    };


    var companyId = $userService.currentUser.company_id;
    $imageService.myLogoCroppedImage = 'http://45.55.7.118/branches/images/'+companyId+'/logo.png'+ '?' + new Date().getTime();

    $logoLoading.flag = true;

    $scope.showInvoice = function() {
      $scope.logoLoaded = true;
      $logoLoading.flag = false;
    };


    $scope.showEvent = 'show';
    $scope.hideEvent = 'hide';
    function showCropper() { $scope.$broadcast($scope.showEvent); }
    function hideCropper() { $scope.$broadcast($scope.hideEvent); }

    $timeout(showCropper);


    $scope.$watch(function(){
      return $logoLoading.flag;
    }, function(flag){
      $scope.loadingLogo = flag;
    });




    var handleLogoSelect=function(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();


      reader.onload = function (evt) {

        $scope.$apply(function($scope){
          $scope.minSize = 500;
          $scope.resultSize = 400;

          $imageService.myImage = evt.target.result;
          $imageService.file = file;
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
      $logoLoading.flag = true;
      $scope.loadingLogo = true;
      
      Cropper.crop($imageService.file,$scope.data)
        .then(Cropper.encode).then(function(dataUrl) {
          $imageService.myLogoCroppedImage = dataUrl;
          $scope.hide();

          $fileUploadService.uploadFileToUrl(dataUrl, $imageService.cropType)
            .then(function(resp) {
              //$logoLoading.flag = false;

            });
        });
    };

    $scope.hide = function() {
      $mdDialog.cancel();
    };



  });
