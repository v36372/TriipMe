TriipMeApp.controller('blogdetailsController',['$scope','$cordovaCamera','$state','$stateParams', '$ionicBackdrop', '$ionicModal', '$ionicSlideBoxDelegate', '$ionicScrollDelegate',function($scope,$cordovaCamera,$state,$stateParams, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate){
    if(fb.getAuth().uid == "")
        $state.go("login");

    $scope.blogid = $stateParams.blogid;
    console.log($scope.blogid);
    $scope.blog = {};
    //if($scope.blogid.length > 0)
    //{
    //    fb.child("database").child("blogs").child($scope.blogid).once("value", function(data) {
    //        $scope.blog = data.val();
    //    });
    //}

    fb.child("database").child("blogs").child($scope.blogid).once("value", function(data) {
        $scope.blog = data.val();
        $scope.blog.events = [];
        console.log($scope.blog);
        data.child("events").forEach(function(eventsnapshot){
            var event = {};
            console.log(eventsnapshot.key());
            event.time = $scope.utilDateFormat(eventsnapshot.key());
            event.title = eventsnapshot.child("title").val();
            event.description = eventsnapshot.child("description").val();
            event.imageList= [{
                img: 'img/girl.jpg'
              }, {
                img: 'img/girl.jpg'
              }, {
                img: 'img/girl.jpg'
              }];
            $scope.blog.events.push(event);
        });

        console.log($scope.blog);
    });
    $scope.zoomMin = 1;

    $scope.showImages = function(index, parentIndex) {
        $scope.activeSlide = index;
        $scope.eventImg= $scope.blog.events[parentIndex].imageList;
        $scope.showModal('view/template/gallery-zoomview.html');
        };
 
    $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope,
        backdropClickToClose: true

      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }
 
    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
    };
     
    $scope.updateSlideStatus = function(slide) {
      var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
      if (zoomFactor == $scope.zoomMin) {
        $ionicSlideBoxDelegate.enableSlide(true);
      } else {
        $ionicSlideBoxDelegate.enableSlide(false);
      }
    };

     

    //$scope.blog.events = [];
    //$scope.blog.desc = "It was the best thing that ever happened."
    //$scope.blog.img = 'img/hong-kong.jpg';
    //$scope.blog.title = "Destined Hong Kong"
    //
    //var event = {};
    //event.imgs = [];
    //event.imgs.push('img/lankwaifong.jpg');
    //event.imgs.push('img/girl.jpg');
    //event.time = (new Date()).toDateString();
    //event.desc = "I went to Lan Kwai Fong and met my soul mate there. It's destiny.";
    //
    //$scope.blog.events.push(event);
    //
    //var event1 = {};
    //event1.imgs = [];
    //event1.imgs.push('img/hongkong2.jpg');
    //event1.time = (new Date()).toDateString();
    //event1.desc = "I enjoyed the rest of the trip with Hong Kong traditional festival.";
    //
    //$scope.blog.events.push(event1);
}]);