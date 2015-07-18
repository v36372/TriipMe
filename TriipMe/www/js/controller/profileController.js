TriipMeApp.controller('profileController',['$scope',function($scope){
	var vm = this;
	vm.post = {};
	vm.post.text = "this is a post";
	vm.post.created_at = "bangkok";
	vm.doSt = doSt;		
	function doSt(){
		console.log('hello profile');
	}
}])