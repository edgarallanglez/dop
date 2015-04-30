'use strict';

/**
 * @ngdoc overview
 * @name dopApp
 * @description
 * dopApp
 *
 * Coupon model.
 */
angular.module('dopApp')
  .factory('$couponFactory', function(Restangular) {
    var coupon = {};
    var getCoupon = function () {
        return this.coupon;
    }

    var setCoupon = function(coupon){
       this.coupon = coupon;
    }

    var getAll = function(){
    	Restangular.all('coupon/all/get').getList().then(function(data){
    		console.log("listo");
    		return data;
    	});
    }
    var getById = function(id){
    	Restangular.one('coupon/'+id+'/get').then(function(data){
    		return data;
    	});
    }
    var deleteById = function(id){
    	SweetAlert.swal({
        title: "Estás seguro?",
        text: "Este cupón sera eliminado para siempre",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F44336",
        confirmButtonText: "Sí, eliminalo!",
        closeOnConfirm: false
      }, 
      function(confirmed){
        if (confirmed) {
          Restangular.one('coupon/' + id + '/delete').put().then(function(){
            SweetAlert.swal("se eliminó el son of a bitch!", "yupi");
          });
        }
      });
    }

    return coupon;
  })