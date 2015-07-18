TriipMeApp.controller('blogcreateController',['$scope','$cordovaCamera','$state',function($scope,$cordovaCamera,$state){
    if(fb.getAuth().uid == "")
        $state.go("login");


    $scope.newblog = {};
    $scope.newblog.like = 0;
    $scope.newblog.cmt = 0;
    $scope.newblog.time = (new Date()).getTime();
    $scope.newblog.author = NameOfUser;

        $scope.createBlog = function(){
        var blogsRef = fb.child("database").child("users").child(fb.getAuth().uid).child("blogs");
        blogsRef.push($scope.newblog);
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
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.newblog.img = imageData;
        }, function(err) {
           console.log(err);
        });
    }

}]);