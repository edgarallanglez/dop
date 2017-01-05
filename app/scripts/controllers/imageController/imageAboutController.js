'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageAboutCtrl
 * @description
 * # ImageAboutCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .service('$aboutService', function() {
    this.about = {
      name: '',
      phone: '',
      description: ''
    };

    this.setAbout = function(item) {
     this.about = item;
   };
  })
  .controller('ImageAboutCtrl', function($aboutService, $scope , $userService, $auth, SweetAlert, $http) {
    $scope.about = {
      name: '',
      description: '',
      phone: ''
    };

    $scope.init = function () {
      var payload = $auth.getPayload();
      var branch_id = $userService.currentUser.branch_id;
      return $http({
        method: 'GET',
        url: 'http://45.55.7.118/api/company/branch/'+branch_id+'/profile/tool/get',
        headers: {'Content-Type': 'application/json'}
      }).success(function(data){
        var branch = data.data[0];
        $scope.about.name =  branch.name;
        $scope.about.description = branch.about;
        $scope.about.phone = branch.phone;

      }).error(function(message) {
        SweetAlert.swal(message, '', 'error');
      //  self.loading = false;
      });
    };

    $scope.$watch(function() {
      return $scope.about;
    }, function (about) {
       $aboutService.setAbout(about);
    });
  });
