TriipMeApp.controller('homeController',['$scope','$state','$timeout',function($scope,$state,$timeout){
    if(fb.getAuth().uid == "")
        $state.go("login");
    $scope.connected = true;
    $scope.redir = function(){
        //if (!$scope.$$phase) {
        //    $scope.$apply(function() { $location.path("/create"); });
        //}
        //$location.path("/create");

        $state.go("create");
    };

    $scope.redirEdit = function(blogid){
        //BlogID = fb.child("database").child("users").child(fb.getAuth().uid).child("blogs")
        console.log($scope.blogs);
        $state.go("blogdetails",{blogid:blogid});

    };

    $scope.blogs = [];
    $scope.userName = fb.child("database").child("users").child(fb.getAuth().uid).child("name");

    var blogsRef = fb.child("database").child("users").child(fb.getAuth().uid).child("blogs");
    blogsRef.orderByChild("time").limitToLast(5).on("child_added", function(snapshot) {
        //var blog = {};
        //blog.title = snapshot.val()
        $scope.connected = false;
        var blog = snapshot.val();
        blog.time = (new Date(blog.time)).toDateString();
        blog.id = snapshot.key();
        $scope.blogs.push(blog);
        console.log(blog);
        $timeout(function(){
            $scope.$apply()
        },0);
    });

}]);