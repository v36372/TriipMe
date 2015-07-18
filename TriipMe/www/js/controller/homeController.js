TriipMeApp.controller('homeController',['$scope','$state','$timeout',function($scope,$state,$timeout){
    $scope.redir = function(){
        //if (!$scope.$$phase) {
        //    $scope.$apply(function() { $location.path("/create"); });
        //}
        //$location.path("/create");

        $state.go("create");
    };

    $scope.blogs = [];
    $scope.userName = fb.child("database").child("users").child(fb.getAuth().uid).child("name");

    var blogsRef = fb.child("database").child("users").child(fb.getAuth().uid).child("blogs");
    blogsRef.orderByChild("time").limitToLast(5).on("child_added", function(snapshot) {
        //var blog = {};
        //blog.title = snapshot.val()
        var blog = snapshot.val();
        blog.time = (new Date(blog.time)).toDateString();
        $scope.blogs.push(blog);
        console.log(snapshot.val());
        $timeout(function(){
            $scope.$apply()
        },0);
    });

}]);