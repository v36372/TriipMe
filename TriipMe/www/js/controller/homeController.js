TriipMeApp.controller('homeController',['$scope','$state','$timeout','userService','$ionicModal',function($scope,$state,$timeout,userServic,$ionicModal){

	// .fromTemplate() method
	if(fb.getAuth().uid == "")
        $state.go("login");

    $scope.show();
    // VARIABLES
    $scope.blog = {};
    $scope.commentContent = "";
    //$scope.connected = true;
    $scope.cmts = [];
    $scope.NameOfUser = NameOfUser;



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
    
    $scope.viewProfile = function(userid){
        console.log(userid);
        $state.go('profile',{userid:userid});
    }

    console.log($state.current);
    $scope.blogs = [];
    $scope.userName = fb.child("database").child("users").child(fb.getAuth().uid).child("name");

    console.log(fb.getAuth());
    var blogsRef = fb.child("database").child("blogs");

    $scope.Init = function()
    {
        blogsRef.once("value",function(data){
            if(data.val() == null)
                $scope.hide();
            //$scope.hide();
            console
        });

        blogsRef.orderByChild("time").limitToLast(5).on("child_added", function (snapshot) {
            //var blog = {};
            //blog.title = snapshot.val()
            //$scope.connected = false;
            var blog = snapshot.val();
            blog.time = (new Date(blog.time)).toDateString();
            blog.id = snapshot.key();
            fb.child("database").child("users").child(blog.author).once('value',function(data){
                blog.authorname = data.child("name").val();
                blog.authoravatar = data.child("avatar").val();
                console.log(blog);
                $scope.blogs.push(blog);
                $scope.hide();
            });

        });
    };

    $scope.Init();

    $scope.likeBlog = function(blog){
        console.log("like");
        console.log(blog.likes.num);
        console.log(blog.id);
        blogsRef.child(blog.id).child("likes").child(fb.getAuth().uid).once("value",function(data){
            console.log("no");
            if(data.val() == null){
                console.log("yes");
                ++blog.likes.num;
                blogsRef.child(blog.id).child("likes").update(
                    {
                        "num":blog.likes.num
                    }
                );
                var obj = {};
                obj[fb.getAuth().uid] = true;

                blogsRef.child(blog.id).child("likes").update(obj);
            }
        });
    };

    $scope.loaded = false;

    $scope.cmts = [];

    $scope.commentBlog = function(blog){
        //console.log(blog.comments.cmts);
        $scope.blog = blog;
        //$scope.commentContent = "";


        //$scope.cmts.push(blog.comments.cmts);
        //blog.comments.cmts.forEach(function(cmt){
        //    $scope.cmts.push(cmt);
        //});
        //console.log($scope.cmts);
        $scope.cmts = [];
        if(!$scope.loaded){
            blogsRef.child(blog.id).child("comments").child("cmts").on("child_added", function(snapshot) {
                $scope.cmts.push(snapshot.val());
            });
            $scope.loaded = true;
        }
        //$scope.commentContent = "";
        $scope.openModal();
    };

    //$scope.sendComment = function(blog,commentContent){
    //    console.log(blog);
    //    console.log(commentContent);
    //    console.log($scope.commentContent);
    //
    //    blogsRef.child(blog.id).child("comments").child("cmts").once("value",function(data){
    //        ++blog.comments.num;
    //        blogsRef.child(blog.id).child("comments").update(
    //            {
    //                "num":blog.comments.num
    //            }
    //        );
    //        console.log(NameOfUser);
    //
    //        blogsRef.child(blog.id).child("comments").child("cmts").push(
    //            {
    //                "author":fb.getAuth().uid,
		//    "authorname":NameOfUser,
    //                "content":commentContent
    //            }
    //        );
    //    });
    //
    //    commentContent = "";
    //    //$scope.Init();
    //};

    $scope.shareBlog = function(){

    };

    $ionicModal.fromTemplateUrl('view/template/commentModalTemplate.html', {
        scope: $scope,
        controller:'ModalInstanceCtrl',
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
        //$scope.commentContent = commentContent;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.loaded = false;
        blogsRef.child($scope.blog.id).child("comments").child("cmts").off("child_added");
        //ref.off("value");
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


TriipMeApp.controller('ModalInstanceCtrl', function ($scope) {
    $scope.cmt = {};
    $scope.cmt.content = "";
    console.log("yes");

    $scope.sendComment = function(blog){
        console.log(blog);
        //console.log(commentContent);
        console.log($scope.cmt.content);

        var blogsRef = fb.child("database").child("blogs");
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
                    "author":fb.getAuth().uid,
                    "authorname":NameOfUser,
                    "content":$scope.cmt.content
                }
            );
        });

        $scope.cmt.content = "";
        //$scope.Init();
    };
});