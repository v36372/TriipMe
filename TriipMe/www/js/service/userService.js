TriipMeApp.service('userService',function(){
	var vm = this;	
	vm.getLoginUser = getLoginUser;
	function getLoginUser(){
		var loginUser = {};
		loginUser.Id = fb.getAuth().uid;
		fb.child("database").child("users").child(loginUser.Id).child("name").once("value", function(data) {
			loginUser.Name = data.val();
		});		
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
})