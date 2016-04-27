'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:LocationWidgetCtrl
 * @description
 * # LocationWidgetCtrl
 * Controller of the dopApp

 */
angular.module('dopApp')
  .config(function($stateProvider, uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDJaKK3Btv5ozr_sNZgt_XBRHHXqX9D1O8',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  })

  .controller('LocationWidgetCtrl', function($scope, $http, $userService, uiGmapGoogleMapApi, uiGmapIsReady) {
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
        latitude: 24.78,
        longitude: -107.43
      },
      zoom: 13
    };

    $scope.marker = {
      id: 0,
      coords: {
        latitude: $userService.getCurrentUser().latitude,
        longitude: $userService.getCurrentUser().longitude
      }
    }

    var branch_id = $userService.getCurrentUser().branch_id;
    $scope.markers = [];
    $http({
      method: 'GET',
      url: 'http://45.55.7.118:5000/api/coupon/taken/location/'+ branch_id,
    }).then(function(data){

      for(var i=0; i < data.data.data.length; i++){
        var object = data.data.data[i];
        //var position = new google.maps.LatLng(object.latitude, object.longitude)
        var marker = {
          id: i,
          latitude: object.latitude,
          longitude: object.longitude,
          name: object.name,
          taken_date: object.taken_date,
          icon: 'images/marker.png'
          /*options: {
            animation: google.maps.Animation.DROP
          }*/
        }
        $scope.markers.push(marker);
      }

      /*var bounds = new google.maps.LatLngBounds();
      for (var i in $scope.markers)
        bounds.extend($scope.markers[i].position) */

    });

    $scope.windowOptions = {
        show: false
    };

    $scope.onClick = function (data) {
        $scope.windowOptions.show = !$scope.windowOptions.show;
        console.log('$scope.windowOptions.show: ', $scope.windowOptions.show);
        console.log('This is a ' + data);
        //alert('This is a ' + data);
    };

    $scope.closeClick = function () {
        $scope.windowOptions.show = false;
    };


    $scope.options = {
      scrollwheel: false,
      styles: [
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#7fc8ed"
              },
              {
                  "saturation": 55
              },
              {
                  "lightness": -6
              },
              {
                  "visibility": "on"
              }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
              {
                  "hue": "#7fc8ed"
              },
              {
                  "saturation": 55
              },
              {
                  "lightness": -6
              },
              {
                  "visibility": "off"
              }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#83cead"
              },
              {
                  "saturation": 1
              },
              {
                  "lightness": -15
              },
              {
                  "visibility": "on"
              }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#f3f4f4"
              },
              {
                  "saturation": -84
              },
              {
                  "lightness": 59
              },
              {
                  "visibility": "on"
              }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "labels",
          "stylers": [
              {
                  "hue": "#ffffff"
              },
              {
                  "saturation": -100
              },
              {
                  "lightness": 100
              },
              {
                  "visibility": "off"
              }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#ffffff"
              },
              {
                  "saturation": -100
              },
              {
                  "lightness": 100
              },
              {
                  "visibility": "on"
              }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "hue": "#bbbbbb"
              },
              {
                  "saturation": -100
              },
              {
                  "lightness": 26
              },
              {
                  "visibility": "on"
              }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#ffcc00"
              },
              {
                  "saturation": 100
              },
              {
                  "lightness": -35
              },
              {
                  "visibility": "simplified"
              }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#ffcc00"
              },
              {
                  "saturation": 100
              },
              {
                  "lightness": -22
              },
              {
                  "visibility": "on"
              }
          ]
        },
        {
          "featureType": "poi.school",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#d7e4e4"
              },
              {
                  "saturation": -60
              },
              {
                  "lightness": 23
              },
              {
                  "visibility": "on"
              }
          ]
        }
      ]
     };

  });
