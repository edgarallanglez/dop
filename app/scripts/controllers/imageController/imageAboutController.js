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
  .controller('ImageAboutCtrl', function($aboutService, $scope , $userService, $auth, SweetAlert, $http, $element) {
    $scope.about = {
      name: '',
      description: '',
      phone: ''
    };

    $scope.filters = [ 'alitas & boneless',
                          'bistro',
                          'cafeteria',
                          'comida china',
                          'comida rapida',
                          'gourmet',
                          'italiana',
                          'marisco',
                          'mexicana',
                          'sushi',
                          'automotriz',
                          'educacion',
                          'electronica',
                          'hogar',
                          'moda',
                          'viajes',
                          'salud y belleza',
                          'bares',
                          'cine',
                          'club nocturno',
                          'deporte',
                          'parques',
                          'teatro',
                          'autoservicio',
                          'Mens Club' ];
    $scope.searchTerm = '';
    $scope.clearSearchTerm = function() {
      $scope.searchTerm = '';
    };
      // The md-select directive eats keydown events for some quick select
      // logic. Since we have a search input here, we don't need that logic.
    // $element.find('input').on('keydown', function(ev) {
    //     ev.stopPropagation();
    // });

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
