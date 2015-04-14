'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('CouponListCtrl', function($scope) {
  	$scope.todos = [
      {
        what: 'Sin límite de personas',
        who: '20% Frapuccino',
        when: '3:08PM',
        notes: "Aplicable hasta el 25 de mayo"
      },
      {
        what: 'Sin límite de personas',
        who: '20% Frapuccino',
        when: '3:08PM',
        notes: "Aplicable hasta el 25 de mayo"
      },
      {
        what: 'Sin límite de personas',
        who: '20% Frapuccino',
        when: '3:08PM',
        notes: "Aplicable hasta el 25 de mayo"
      },
      {
        what: 'Sin límite de personas',
        who: '20% Frapuccino',
        when: '3:08PM',
        notes: "Aplicable hasta el 25 de mayo"
      },
      {
        what: 'Sin límite de personas',
        who: '20% Frapuccino',
        when: '3:08PM',
        notes: "Aplicable hasta el 25 de mayo"
      },
    ];
  });