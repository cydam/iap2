angular.module('clo.controllers', [])

.controller('DashCtrl', function($scope, $cordovaContacts) {
$scope.sInput = "";
$scope.PCL = "";
$scope.savedC = JSON.parse(localStorage.getItem('selContact'));



  $scope.selContact = function(sel) {
    $cordovaContacts.saveSel(sel).then(function(result) {
      // Contact saved
    }, function(err) {
      // Contact error
    });
  }
  
  $scope.addContact = function(sName, sPhone) {
  var phoneNumbers = [];
      phoneNumbers[0] = new ContactField('mobile', sPhone, true);
		
  $scope.contactForm = {"displayName": sName, "nickname": sName, "phoneNumbers": phoneNumbers};
    $cordovaContacts.save($scope.contactForm).then(function(result) {
      // Contact saved
	  alert('Contact saved...');
    }, function(err) {
      // Contact error
    });
  }
  
  $scope.synchContact = function() {
 var filter = ["displayName", "phoneNumbers"];
		
    $cordovaContacts.find(filter).then(function(result) {
      //result
	  $scope.PC = result;
	  alert('Contacts synchronized...');
    }, function(err) {
      // Contact error
    });
  } 
  
  $scope.loadContact = function() {
 var filter = ["displayName", "phoneNumbers"];
		
    $cordovaContacts.find(filter).then(function(result) {
      //result
	  $scope.PCL = result;
    }, function(err) {
      // Contact error
    });
  }

  // Many more features will be added shortly
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});