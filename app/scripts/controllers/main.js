'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('MainCtrl', ['$scope', function(scope) {
    scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.data = {
      title: 'Aqui va el Dashboard con graficas'
    };
  }])
  //Controlador SideBar derecho
  .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function(scope,to,mds,log) {
    scope.close = function() {
      mds('right').close()
          .then(function(){
            log.debug("close RIGHT is done");
          });
    };
}]);
  

  