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
  .factory('CouponFactory', function(Restangular, SweetAlert) {
  	function CouponFactory(coupon) {
        if (coupon) {
            this.setCoupon(coupon);
        }
    };
 
    CouponFactory.prototype = {
        setCoupon : function(coupon) {
            angular.extend(this, coupon);
        },
        getAll : function(branch_id){
        	return Restangular.all('coupon/all/'+ branch_id +'/get').getList().then(function(data){
	    		return data;
    		});
        },
        getById : function(id){
        	return Restangular.one('coupon/'+ id +'/get').then(function(data){
    			return data;
    		});
        },
        deleteById : function(id){
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
    };

    return CouponFactory;
  });