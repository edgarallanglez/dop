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
    coupon.getGodCoupon = function () {
        return this.coupon;
    }

    coupon.setGodCoupon = function(coupon){
       this.coupon = coupon;
    }

    coupon.getAll = function(){
    	Restangular.all('coupon/all/get').getList().then(function(data){
    		console.log("listo");
    		return data;
    	});
    }
    coupon.getById = function(id){
    	Restangular.one('coupon/'+ id +'/get').then(function(data){
    		return data;
    	});
    }
    coupon.deleteById = function(id){
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