TriipMeApp.controller('profileController',['$scope','$timeout','userService','blogsService',function($scope,$timeout,userService,blogsService){	
	$scope.user = userService.getLoginUser();
	$scope.blogs = blogsService.getBlogs($scope.user.Id);		    		
}]);