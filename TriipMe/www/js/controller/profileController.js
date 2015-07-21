TriipMeApp.controller('profileController',['$scope','$state','$timeout','userService','blogsService','$stateParams',function($scope,$state,$timeout,userService,blogsService,$stateParams){
	if(fb.getAuth().uid == "")
		$state.go("login");


	$scope.show();
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
		console.log($scope.user.Id);
		//$scope.blogs = blogsService.getBlogs($scope.user.Id);
		var blogsRef = fb.child("database").child("blogs");
		$scope.blogs = [];
		var time = 0;
		blogsRef.orderByChild("author").equalTo($scope.user.Id).limitToLast(5).on("child_added", function(snapshot) {
			time++;
			var blog = snapshot.val();
			blog.time = (new Date(blog.time)).toDateString();
			blog.id = snapshot.key();
			$scope.blogs.push(blog);
			console.log("fired");
			$scope.hide();
		});
		$timeout(function(){$scope.$apply();console.log("backfired");},500);
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