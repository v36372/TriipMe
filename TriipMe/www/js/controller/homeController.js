TriipMeApp.controller('homeController',['$scope','$state','$timeout','userService','$ionicPopover','$ionicPopup',function($scope,$state,$timeout,userServic,$ionicPopover,$ionicPopup){

	// .fromTemplate() method
  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Title</h1> </ion-header-bar> <ion-content>Hello</ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };

   $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Leave us',
     template: 'Are you sure you want to log out?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };

	
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
    
    $scope.viewProfile = function(){
        $state.go('profile');
    }
    
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