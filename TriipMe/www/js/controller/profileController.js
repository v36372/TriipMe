TriipMeApp.controller('profileController',['$scope','$timeout','userService','blogsService',function($scope,$timeout,userService,blogsService){
	var vm = this;
	vm.user = userService.getUser();
	vm.blogs = blogsService.getBlogs(vm.user.Id);
	console.log(vm.blogs);		    		
}]);