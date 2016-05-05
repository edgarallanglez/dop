'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageLocatorCtrl
 * @description
 * # ImageLocatorCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function(uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDJaKK3Btv5ozr_sNZgt_XBRHHXqX9D1O8',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  })
  .controller('ImageLocatorCtrl', function ($scope, $userService, location, uiGmapGoogleMapApi, uiGmapIsReady) {
    var latitude = $userService.getCurrentUser().latitude;
    var longitude = $userService.getCurrentUser().longitude;

    uiGmapGoogleMapApi.then(function(maps) {
      if( typeof _.contains === 'undefined' ) {
        _.contains = _.includes;
        _.prototype.contains = _.includes;
      }
      if( typeof _.object === 'undefined' ) {
          _.object = _.zipObject;
      }
    });
    uiGmapIsReady.promise().then(function() {
      $scope.mapLoaded = true;
    });

    $scope.map = {
      center: {
        latitude: latitude,
        longitude: longitude
      },
      zoom: 16,
      marker: {
        id: 0,
        coords: {
          latitude: latitude,
          longitude: longitude
        }
      },
      control: {}
    };

    location.get(angular.noop, angular.noop);

    $scope.getLocation = function(lookedUpLocation) {
      if (lookedUpLocation !== undefined) {
        document.querySelector('#locator-input').value = lookedUpLocation.description;


        $scope.map.marker.coords = {
          latitude: lookedUpLocation.latitude,
          longitude: lookedUpLocation.longitude
        };

        $scope.map.center = {
          latitude: lookedUpLocation.latitude,
          longitude: lookedUpLocation.longitude
        };

        $scope.map.control.getGMap();
        var results = document.querySelectorAll('li');
        for (var i = 0; i < results.length; ++i) { results[i].remove(); }
      }
    };

    $scope.$watch('lookedUpLocation', $scope.getLocation);
  });
