TriipMeApp.service('userService',['$timeout',function($timeout){
	var vm = this;	
	vm.getUser = getUser;
	function getUser(userid){
		var loginUser = {};
		loginUser.Id = userid;
		fb.child("database").child("users").child(loginUser.Id).child("name").once("value", function(data) {
			loginUser.Name = data.val();
		});
		$timeout(function(){

			console.log(userid);

			return loginUser;
		},500);

		return loginUser;
	}
	vm.currentUser = {};		
	vm.getCurrentUser = getCurrentUser;
	vm.setCurrentUser = setCurrentUser;

	function getCurrentUser(){
		return vm.currentUser;		
	}
	function setCurrentUser(user){
		vm.currentUser = user;
	}


}]);