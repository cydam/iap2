
angular.module('ngCordova', [
  'ngCordova.plugins'
]);


angular.module('ngCordova.plugins', [
	 'contact'
]);

angular.module('clo.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})
.factory('$cordovaContacts', ['$q', function ($q) {
var restoredSel = JSON.parse(localStorage.getItem('selContact'));


    return {
      saveSel: function (savedData) {
        var q = $q.defer();
        
            q.resolve(localStorage.setItem('selContact', JSON.stringify(savedData)));
        
        return q.promise;
      },
	  
	  getSelected: function () {
	  var q = $q.defer();
	  q.resolve(restoredSel);
	  //alert(restoredSel);
        return q.promise;
      },
	  
	  save: function (contact) {
        var q = $q.defer();
        var deviceContact = navigator.contacts.create(contact);
        deviceContact.save(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      remove: function (contact) {
        var q = $q.defer();
        var deviceContact = navigator.contacts.create(contact);

        deviceContact.remove(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      clone: function (contact) {
        var deviceContact = navigator.contacts.create(contact);
        return deviceContact.clone(contact)
      },

      find: function (filter) {
        var q = $q.defer();
        //var fields = options.fields || ['displayName', 'phoneNumbers'];
        //delete options.fields;
		var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;

        navigator.contacts.find(filter, function (results) {
            q.resolve(results);
          },
          function (err) {
            q.reject(err);
          },
          options);

        return q.promise;
      },

      
       getContact: function (contact) {
		   var q = $q.defer();
		   navigator.contacts.pickContact(function(contact){
		   alert('something');
				q.resolve(contact);
			},function(err){
			alert('nothing');
				q.reject(err);
			});

       }
       
	   

      // TODO: method to set / get ContactAddress
      // TODO: method to set / get ContactError
      // TODO: method to set / get ContactField
      // TODO: method to set / get ContactName
      // TODO: method to set / get ContactOrganization

    }

  }]);
