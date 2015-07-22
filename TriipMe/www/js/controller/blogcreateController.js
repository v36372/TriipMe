TriipMeApp.controller('blogcreateController',['$scope','$cordovaCamera','$state',function($scope,$cordovaCamera,$state){
    if(fb.getAuth().uid == "")
        $state.go("login");

    console.log(fb.getAuth().uid);
    $scope.newblog = {};
    $scope.newblog.likes = {};
    $scope.newblog.comments = {};
    $scope.newblog.likes.num = 0;
    $scope.newblog.comments.num = 0;
    $scope.photos=[];
    $scope.photo={};
    $scope.newblog.events=[];
    $scope.event={};


    //for (var i = 0; i < 100; i++) {
    //    $scope.photos.push({
    //        width: 300,
    //        height: 300,
    //        src: 'http://placekitten.com/' + 299 + '/' + 300
    //    });
    //};

    $scope.createBlog = function(){
        var blogsRef = fb.child("database").child("blogs");
        $scope.newblog.time = (new Date()).getTime();
        $scope.newblog.author = fb.getAuth().uid;

        /* This code should be functional when photo.date is ready
        $scope.event = {};
        $scope.photosDate=[];
        $scope.photos.forEach(function(photo){

            //if this photo date is the new day, note that each event should be classified by date not exact time (Day 1, day 2, ...)
            if($scope.photosDate.indexOf(photo.date)==-1){
                $scope.photosDate.push(photo.date);
                $scope.event.title= photo.date;
                $scope.event.imageList.push(photo);
                $scope.event.description="Having fun with Triip@ "+ photo.location;
                $scope.newblog.events.push($scope.event);
                $scope.event={};
            }
            else
            {
                  for (var i=0; i<$scope.newblog.events.length; i++) {
                        if($scope.newblog.events[i].title==photo.date){
                            $scope.newblog.events[i].imageList.push(photo);
                            }                 
                        };
            };

        });
        if($scope.newblog.events.length==0)
        {
            $scope.event.title= (new Date()).getTime();
            $scope.event.description="Having fun with Triip, sorry no image now";
            $scope.newblog.events.push($scope.event);

        }
        */
        blogsRef.push($scope.newblog);
        Camera.cleanup(null,null);
        $state.go('home');    
    };

    $scope.choosePicture = function(){
        window.imagePicker.getPictures(
            function(results) {
                for (var i = 0; i < results.length; i++) {
                    // DO STUFF HERE
                    console.log('Image URI: ' + results[i]);
                    var imgURI = "data:image/jpeg;base64," + results[i];
                    $scope.newblog.img = results[i];
                    $scope.photos.push(imgURI);

                    $('#img-container').css('height','250px')
                }
            }, function (error) {
                console.log('Error: ' + error);
            }, {
                // max images to be selected, defaults to 15. If this is set to 1, upon
                // selection of a single image, the plugin will return it.
                maximumImagesCount: 10,

                // max width and height to allow the images to be.  Will keep aspect
                // ratio no matter what.  So if both are 800, the returned image
                // will be at most 800 pixels wide and 800 pixels tall.  If the width is
                // 800 and height 0 the image will be 800 pixels wide if the source
                // is at least that wide.
                width: 300,
                height: 300,

                // quality of resized image, defaults to 100
                quality: 50
            }
        );
    };

    $scope.takePicture = function(){
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
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

            $('#img-container').css('height','250px')
        }, function(err) {
            console.log(err);
        });
    };

}]);

