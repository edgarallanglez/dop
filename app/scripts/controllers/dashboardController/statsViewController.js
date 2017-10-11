'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:StatsViewCtrl
 * @description
 * # StatsViewCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider) {
})
  .controller('StatsViewCtrl', function($rootScope, $scope, $http, $userService) {
  var branch_id = $userService.currentUser.branch_id;
  $scope.stats = {
    likes: 0,
    views: 0,
    uses: 0
  }
  $http({
    method: 'GET',
    url: 'http://45.55.7.118:5000/api/company/branch/' + branch_id + '/full/stats/get'
  }).success(function(result) {
    angular.forEach(result.data, function (obj, index) {
      $scope.stats.likes += obj.total_likes;
      $scope.stats.views += obj.views;
      $scope.stats.uses += obj.total_uses;
    });
    $scope.stats.profile_views = result.data[0].profile_views;
    $scope.loading = false;
  });
});