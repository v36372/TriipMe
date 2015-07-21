TriipMeApp.controller('MainController', ['$scope','$state','$ionicPopover','$ionicPopup','$ionicLoading','$ionicModal','$ionicHistory',function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory) {
  $scope.headerGoBack = function () {
    $ionicHistory.goBack();
    if ($ionicHistory.backTitle() === 'Home'){
      $scope.viewHome();
      $('#myTab').css('display','block');
    }
    if ($ionicHistory.backTitle() === 'Profile'){
      $scope.viewProfile();
      $('#myTab').css('display','block');
    }    
    if ($ionicHistory.backTitle() === 'TriipMe Login'){
      $('#myTab').css('display','none');
    }
  }

  //$('html').click(function(){
  //  $scope.closeModal();
  //})
  
  $scope.preventClose = function($event){
    $event.stopPropagation();
  }

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

  $scope.viewHome = function($event){
    $('#homeTab').addClass('active');
    $('#profileTab').removeClass('active');
    $('#favoriteTab').removeClass('active');
    $('#settingTab').removeClass('active');
  };
  
  $scope.viewFavorites = function($event){
    $('#homeTab').removeClass('active');
    $('#profileTab').removeClass('active');
    $('#favoriteTab').addClass('active');
    $('#settingTab').removeClass('active');
  };

  $scope.openPopover = function($event) {
    $('#homeTab').removeClass('active');
    $('#profileTab').removeClass('active');
    $('#favoriteTab').removeClass('active');
    $('#settingTab').addClass('active');       
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
        $scope.closePopover();
        fb.unauth();
        $('#myTab').css('display','none');
        $state.go("login");
      } else {
        console.log('You are not sure');
        $scope.closePopover();
      }
    });
  };

  $scope.viewUserProfile = function(uid){
    $scope.closeModal();
    $state.go('profile',{userid:uid});
  };

  $scope.viewProfile = function(){
    $('#homeTab').removeClass('active');
    $('#profileTab').addClass('active');
    $('#favoriteTab').removeClass('active');
    $('#settingTab').removeClass('active');    
    $state.go('profile',{userid:fb.getAuth().uid});
  };

  $scope.isLoggedIn = false;
  //console.log(fb.getAuth().uid);
  //console.log($state);
  //$scope.url = $state.url();

  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="lines" class="spinner-positive"></ion-spinner>'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

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

  var blogsRef = fb.child("database").child("blogs");
  $scope.loaded = false;
  $scope.cmts = [];
  $scope.commentBlog = function($event,blog){
    //console.log(blog.comments.cmts);
    $event.stopPropagation();
    $scope.blog = blog;
    //$scope.commentContent = "";


    //$scope.cmts.push(blog.comments.cmts);
    //blog.comments.cmts.forEach(function(cmt){
    //    $scope.cmts.push(cmt);
    //});
    //console.log($scope.cmts);

    if(!$scope.loaded){
      blogsRef.child(blog.id).child("comments").child("cmts").on("child_added", function(snapshot) {
        $scope.cmts.push(snapshot.val());
      });
      $scope.loaded = true;
    }
    //$scope.commentContent = "";
    $scope.openModal();
  };

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