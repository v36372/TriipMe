TriipMeApp.service('userService',function(){
	var vm = this;	
	vm.userInfo = {};	
	vm.getUser = getUser;
	vm.setUser = setUser;		
	function getUser(){
		return vm.userInfo;		
	}	
	function setUser(user){
		vm.userInfo = user;
	}
})