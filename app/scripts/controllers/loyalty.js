'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:LoyaltyCtrl
 * @description
 * # LoyaltyCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
    $stateProvider
      // HOME STATES AND NESTED VIEWS ========================================
      .state('loyalty.list', {
        views: {
            // the child views will be defined here (absolutely named)
            'loyaltyPeople': {
              templateUrl: '../../views/loyaltyViews/loyaltyView.html',
              controller: 'LoyaltyListCtrl'
            }
        }
      });
  })
  .controller('LoyaltyCtrl', function($scope, $state) {
    $state.go('loyalty.list');
  });
