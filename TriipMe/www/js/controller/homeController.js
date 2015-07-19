TriipMeApp.controller('homeController',['$scope','$state','$timeout','userService','$ionicModal',function($scope,$state,$timeout,userServic,$ionicModal){

	// .fromTemplate() method
	if(fb.getAuth().uid == "")
        $state.go("login");

    // VARIABLES
    $scope.blog = {};
    $scope.commentContent = "";
    $scope.connected = true;
    $scope.cmts = [];

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
    
    $scope.viewProfile = function(){
        $state.go('profile');
    }

    console.log($state.current);
    $scope.blogs = [];
    $scope.userName = fb.child("database").child("users").child(fb.getAuth().uid).child("name");

    var blogsRef = fb.child("database").child("users").child(fb.getAuth().uid).child("blogs");

    $scope.Init = function()
    {
        blogsRef.orderByChild("time").limitToLast(5).on("child_added", function (snapshot) {
            //var blog = {};
            //blog.title = snapshot.val()
            $scope.connected = false;
            var blog = snapshot.val();
            blog.time = (new Date(blog.time)).toDateString();
            blog.id = snapshot.key();
            $scope.blogs.push(blog);
            console.log(blog);
            $timeout(function () {
                $scope.$apply()
            }, 0);
        });
    };

    $scope.Init();

    $scope.likeBlog = function(blog){
        console.log("like");
        console.log(blog.likes.num);
        console.log(blog.id);
        blogsRef.child(blog.id).child("likes").child(fb.getAuth().uid).once("value",function(data){
            console.log("no");
            if(data == null){
                console.log("yes");
                ++blog.like;
                blogsRef.child(blog.id).child("likes").update(
                    {
                        "num":blog.like,
                        "fb.getAuth().uid" : true
                    }
                );
            }
        });
    };

    $scope.commentBlog = function(blog){
        console.log(blog.comments.cmts);
        $scope.blog = blog;
        $scope.commentContent = "";

        //$scope.cmts.push(blog.comments.cmts);
        //blog.comments.cmts.forEach(function(cmt){
        //    $scope.cmts.push(cmt);
        //});
        //console.log($scope.cmts);
        blogsRef.child(blog.id).child("comments").child("cmts").on("child_added", function(snapshot) {
                $scope.cmts.push(snapshot.val());
        });

        $scope.commentContent = "";
        $scope.openModal();
    };

    $scope.sendComment = function(blog,commentContent){
        console.log(blog);
        console.log(commentContent);
        console.log($scope.commentContent);

        blogsRef.child(blog.id).child("comments").child("cmts").once("value",function(data){
            ++blog.comments.num;
            blogsRef.child(blog.id).child("comments").update(
                {
                    "num":blog.comments.num
                }
            );
            console.log(NameOfUser);
            blogsRef.child(blog.id).child("comments").child("cmts").push(
                {
                    "author":NameOfUser,
                    "content":commentContent
                }
            );
        });

        commentContent = "";
        //$scope.Init();
    };

    $scope.shareBlog = function(){

    };

    $ionicModal.fromTemplateUrl('view/template/commentModalTemplate.html', {
        scope: $scope,
        commentContent:$scope.commentContent,
        animation: 'slide-in-up'
    }).then(function(modal,commentContent) {
        $scope.modal = modal;
        $scope.commentContent = commentContent;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
}]);