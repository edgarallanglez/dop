'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageCtrl
 * @description
 * # ImageCtrl
 * Controller of the dopApp
 */

angular.module('dopApp')
  .service('$imageService', function() {
    this.myImage = '';
    this.myLogoCroppedImage = '';
    this.myBannerCroppedImage = '';
    this.cropType = 'square';
    this.aspectRatio = 1.0;
  })
  .service('$fileUploadService', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, params){
      var fd = new FormData();
      fd.append('file', file);
      var promise = $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined},
        params: params
      });
      return promise;
    };
  })
  .config(function($stateProvider){
    $stateProvider
      // HOME STATES AND NESTED VIEWS ========================================
      .state('image.dashboard', {
        views: {
            // the child views will be defined here (absolutely named)
            'logoView': {
              templateUrl: '../../views/imageViews/logoView.html',
              controller: 'ImageLogoCtrl'
            },
            'bannerView': {
              templateUrl: '../../views/imageViews/bannerView.html',
              controller: 'ImageBannerCtrl'
            },
            'locatorView': {
              templateUrl: '../../views/imageViews/locatorView.html',
              controller: 'ImageLocatorCtrl'
            }
        }
      });
  })
  .controller('ImageCtrl', function ($scope, $http, $mdDialog, $imageService, $state) {
    $state.go('image.dashboard');

    $scope.save = function(event) {
      console.log(event);
    };
  });
