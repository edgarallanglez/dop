'use strict';

if (typeof CryptoJS == 'undefined') {
    var cryptoSrc = 'http://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', cryptoSrc);
    document.body.appendChild(scriptTag);
}
angular.module('dopApp')
  .controller('NotificationCtrl', function($scope, $location,$timeout, $q, $log, $http, SweetAlert) {

    $scope.send_to_all= true;
    $scope.adults_only = false;
    $scope.message = '';
    /*var self = this;

    self.simulateQuery = true;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

  
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }


    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }*/
  
  	var self = this;
    var pendingSearch, cancelSearch = angular.noop;
    var lastSearch;


    self.allContacts = loadContacts();
    self.contacts = [self.allContacts[0]];
    $scope.asyncContacts = [];
    $scope.filterSelected = true;

    self.querySearch = querySearch;
    self.delayedQuerySearch = delayedQuerySearch;
    self.searchingQuery = searchingQuery;
    self.data = null;

    /**
     * Search for contacts; use a random delay to simulate a remote call
     */
    function querySearch (criteria) {
    	//var defer = $q.defer();
    	
		//return defer.promise;
     return criteria ? self.allContacts.filter(createFilterFor(criteria)) : [];
    }

    /**
     * Async search for contacts
     * Also debounce the queries; since the md-contact-chips does not support this
     */
     function searchingQuery(criteria){
     	return pendingSearch = $q(function(resolve, reject){
     		cancelSearch = reject;

     		$http({
		      method: 'GET',
		      url: 'http://45.55.7.118:5000/api/user/admin/people/search/'+criteria,
		    }).success(function(data){
            self.allContacts = [];
            data.data.forEach(function(user) {
              var contact = {
                names: user.names +" "+ user.surnames,
                device_os: user.device_os,
                user_id: user.user_id,
                device_token: user.device_token,
                image: user.main_image
              }
              contact._lowername = contact.names.toLowerCase();
              self.allContacts.push(contact);

            });

		    	
        		//self.allContacts[0] = contact;

		    	resolve(self.querySearch(criteria));
		    	//self.asyncContacts = data.data[0].description;
		    }).error(function(){

		      SweetAlert.swal("Error al cargar cupones, porfavor refresque la pagina", "", "error")
		   });

     	})
     	return pendingSearch;
     }
    function delayedQuerySearch(criteria) {
      if ( !pendingSearch || !debounceSearch() )  {
        cancelSearch();

        return pendingSearch = $q(function(resolve, reject) {
          // Simulate async search... (after debouncing)
          cancelSearch = reject;


          /*$timeout(function() {

            resolve( self.querySearch(criteria) );

            refreshDebounce();
          }, Math.random() * 500, true)*/
        });
      }

      return pendingSearch;
    }
    $scope.sendNotification = function() {
      if($scope.send_to_all){
        sendToAll();
      }else{
        sendTo();
      }

      /*if($scope.send_to_all){
        sendToAll();
      }else{
        self.users_token = [];
        var users = {
          name : 'jo',
          employees : 'lol',
          headoffice : 'mmh'
        };  
        $http({
            method: 'POST',
            url: 'http://45.55.7.118:5000/api/notification/push/to',
            data: { device:'ios', title: 'JUE', message: $scope.message}
          }).success(function(data){
            console.log(data);
            alert(data);
          }).error(function(){
            alert("Error");
         });
      }*/
    };

    function refreshDebounce() {
      lastSearch = 0;
      pendingSearch = null;
      cancelSearch = angular.noop;
    }
    function sendTo(){
      self.ios_tokens = [];
      self.android_tokens = [];

      angular.forEach($scope.asyncContacts, function(data){
        if(data.device_os == 'ios'){
          self.ios_tokens.push(data.device_token);
        }else{
          self.android_tokens.push(data.device_token);
        }
      });

      $http({
            method: 'POST',
            url: 'http://45.55.7.118:5000/api/notification/push/to',
            data: { ios_tokens: self.ios_tokens, android_tokens: self.android_tokens, message: $scope.message}
          }).success(function(data){
            console.log(data);
            alert(data);
          }).error(function(){
            alert("Error");
         });

      console.log(self.ios_tokens);
      console.log(self.android_tokens);

    }
    function sendToAll(){
      $http({
            method: 'POST',
            url: 'http://45.55.7.118:5000/api/notification/push/to/all',
            data: { device:'ios', adults_only: $scope.adults_only, message: $scope.message}
          }).success(function(data){
            console.log(data);
            alert(data);
          }).error(function(){

            alert("Error");
         });
    }

    /**
     * Debounce if querying faster than 300ms
     */
    function debounceSearch() {
      var now = new Date().getMilliseconds();
      lastSearch = lastSearch || now;

      return ((now - lastSearch) < 300);
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);
      };

    }



    function loadContacts() {
      var contacts = [
        'Marina Augustine',
        'Oddr Sarno',
        'Nick Giannopoulos',
        'Narayana Garner',
        'Anita Gros',
        'Megan Smith',
        'Tsvetko Metzger',
        'Hector Simek',
        'Some-guy withalongalastaname'
      ];

      return contacts.map(function (c, index) {
        var cParts = c.split(' ');
        var email = cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com';
        var hash = CryptoJS.MD5(email);

        var contact = {
          name: c,
          email: email,
          image: '//www.gravatar.com/avatar/' + hash + '?s=50&d=retro'
        };
        contact._lowername = contact.name.toLowerCase();
        return contact;
      });
    }


});

