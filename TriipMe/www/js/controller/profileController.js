TriipMeApp.controller('profileController',['$scope','$state','$timeout','userService','blogsService',function($scope,$state,$timeout,userService,blogsService){	
	$scope.user = userService.getLoginUser();
	$scope.blogs = blogsService.getBlogs($scope.user.Id);
	$scope.redirEdit = redirEdit;
	$scope.viewProfile = viewProfile;
	$scope.createNewBlog = createNewBlog;
	
	function redirEdit(blogid){
        //BlogID = fb.child("database").child("users").child(fb.getAuth().uid).child("blogs")
        console.log($scope.blogs);
        $state.go("blogdetails",{blogid:blogid});
    };		    		
	
	function viewProfile(){
		$state.go('profile');
	}
	
	function createNewBlog(){      
        $state.go("create");
    };
}]);