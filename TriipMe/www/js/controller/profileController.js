TriipMeApp.controller('profileController',['$scope','$state','$timeout','userService','blogsService','$stateParams',function($scope,$state,$timeout,userService,blogsService,$stateParams){

	var userid;
	console.log($stateParams);
	//if($stateParams.userid === 0)
	//	userid = fb.getAuth().uid;
	//else
	userid = $stateParams.userid;
	console.log($stateParams.userid);
	console.log(userid);

	$scope.user = {};

	$scope.user.Id = userid;
	fb.child("database").child("users").child(userid).child("name").once("value", function(data) {
		$scope.user.Name = data.val();
		$scope.blogs = blogsService.getBlogs($scope.user.Id);
	});
	//$scope.user = userService.getUser(userid);
	//$scope.blogs = blogsService.getBlogs($scope.user.Id);
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