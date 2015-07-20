TriipMeApp.controller('blogcreateController',['$scope','$cordovaCamera','$state','$timeout',function($scope,$cordovaCamera,$state,$timeout){
    if(fb.getAuth().uid == "")
        $state.go("login");

    console.log(fb.getAuth().uid);
    $scope.newblog = {};
    $scope.newblog.likes = {};
    $scope.newblog.comments = {};
    $scope.newblog.likes.num = 0;
    $scope.newblog.comments.num = 0;
    $scope.newblog.time = (new Date()).getTime();
    $scope.newblog.author = fb.getAuth().uid;
    $scope.photos=[];
    $scope.photo={};

    //for (var i = 0; i < 100; i++) {
    //    $scope.photos.push({
    //        width: 300,
    //        height: 300,
    //        src: 'http://placekitten.com/' + 299 + '/' + 300
    //    });
    //};

    $scope.createBlog = function(){
        var blogsRef = fb.child("database").child("blogs");
        blogsRef.push($scope.newblog);
        Camera.cleanup(null,null);
    };

    $scope.choosePicture = function(){
        $scope.imageHandle(Camera.PictureSourceType.PHOTOLIBRARY);
    };

    $scope.takePicture = function(){
        $scope.imageHandle(Camera.PictureSourceType.CAMERA);
    };

    $scope.imageHandle = function(Type) {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Type,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true

        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            var imgURI = "data:image/jpeg;base64," + imageData;
            $scope.newblog.img = imageData;
            $scope.photos.push(imgURI);
        }, function(err) {
           console.log(err);
        });
    }

}]);

