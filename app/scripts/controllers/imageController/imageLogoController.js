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
  .service('$uploading', function(){
    this.flag = false;
  })
  .directive('logoonload', function ($logoLoading) {
      $logoLoading.flag = true;
      return {
          restrict: 'A',
          link: function (scope, element, attrs) {
              element.bind('load', function() {
                  scope.$apply(attrs.logoonload);
              });
          }
        };
  })
  .directive('checklogo', function($http, $logoLoading) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                $http.get(ngSrc).success(function(){
                    alert('image exist');
                }).error(function(){
                    console.log("Imagen no encontrada");
                    $logoLoading.flag = false;
                    //element.attr('src', '/images/default_user.jpg'); // set default image
                });
            });
        }
    };
  })
  .controller('ImageLogoCtrl', function ($scope, $auth, $http, $templateCache, $mdDialog, $imageService, $fileUploadService, $logoLoading, Cropper, $timeout, $userService, $uploading) {
    $scope.minSize = $imageService.minSize;
    $scope.resultSize = $imageService.resultSize;

    $scope.aspectRatio = $imageService.aspectRatio;
    $scope.myImage = $imageService.myImage;
    $scope.myCroppedImage = '';
    $scope.cropType = $imageService.cropType;


    $scope.loadingLogo = $logoLoading.flag;
    $scope.isUploading = $uploading.flag;

    $scope.cropper = {};
    $scope.cropperProxy = 'cropper.first';

    $scope.uploading = false;

    $scope.options = {
          maximize: true,
          viewMode: 0,
          aspectRatio: 1 / 1,
          dragMode: 'move',
          crop: function(dataNew) {
            $scope.data = dataNew;

          }
    };


    var companyId = $userService.currentUser.company_id;
    $imageService.myLogoCroppedImage = 'http://45.55.7.118/branches/images/'+companyId+'/logo.png'+ '?' + new Date().getTime();



    $scope.onLoadLogo = function() {
        $scope.logoLoaded = true;
        $scope.loadingLogo = false;
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

    $scope.$watch(function(){
      return $uploading.flag;
    }, function(flag){
      $scope.isUploading = flag;
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
      $uploading.flag = true;

      Cropper.crop($imageService.file,$scope.data)
        .then(Cropper.encode).then(function(dataUrl) {
          $imageService.myLogoCroppedImage = dataUrl;
          $scope.hide();

          $fileUploadService.uploadFileToUrl(dataUrl, $imageService.cropType)
            .then(function(resp) {
              $uploading.flag = false;
            });
        });
    };

    $scope.hide = function() {
      $mdDialog.cancel();
    };



  });
