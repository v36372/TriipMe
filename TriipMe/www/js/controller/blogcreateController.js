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

        ////This code should be functional when photo.date is ready
        $scope.event = {};
        //$scope.photosDate=[];
        $scope.event.imageList = [];
        //$scope.trips = [];

        var tripRef = fb.child("database").child("trips").child(fb.getAuth().uid);
        //tripRef.once(fb.getAuth().uid,function(snapshot){
        //    console.log(snapshot.val());
        //    $scope.trips.push(snapshot.val());
        //});

        $scope.photos.forEach(function(photo){
            //if this photo date is the new day, note that each event should be classified by date not exact time (Day 1, day 2, ...)
            //if($scope.photosDate.indexOf(photo.date)==-1){
            //    $scope.photosDate.push(photo.date);
            //    $scope.event.title= photo.date;
            //    $scope.event.description="Having fun with Triip@ "+ photo.location;
            //
            //    tripRef.orderByChild("time_from").endAt(photo.date).once("value", function(snapshot) {
            //        var trip = snapshot.val();
            //
            //        // found suitable trip
            //        if(trip.time_to > photo.date){
            //            photo.tripid = snapshot.key();
            //            snapshot.child(events).forEach(function loop(eventsnapshot){
            //                // found suitable event
            //                if(loop.stop) {
            //                    return;
            //                }
            //                var event = eventsnapshot.val()
            //                if(eventsnapshot.key() <= photo.date && event.time_end >= photo.date){
            //                    $scope.event.title = event.name;
            //                    $scope.event.description = event.location;
            //                    $scope.event.imageList.push(photo);
            //                    loop.stop = true;
            //                }
            //            });
            //        }
            //
            //        $scope.newblog.events.push($scope.event);
            //    });
            //
            //    $scope.event={};
            //}
            //else
            //{
            //      for (var i=0; i<$scope.newblog.events.length; i++) {
            //            if($scope.newblog.events[i].title==photo.date){
            //                $scope.newblog.events[i].imageList.push(photo);
            //                }
            //            };
            //};
            var newevent = {};
            var found = false;
            newevent.title= photo.date;
            newevent.description="Having fun with Triip@ "+ photo.location;
            newevent.imageList.push(photo);
            tripRef.orderByChild("time_from").endAt(photo.date).limitToLast(1).once("value", function(snapshot) {
                var trip = snapshot.val();

                // found suitable trip
                if(trip.time_to > photo.date){
                    photo.tripid = snapshot.key();
                    snapshot.child(events).forEach(function loop(eventsnapshot){
                        // found suitable event
                        if(loop.stop) {
                            return;
                        }
                        var event = eventsnapshot.val();
                        if(eventsnapshot.key() <= photo.date && event.time_end >= photo.date){
                            newevent.title = event.name;
                            newevent.description = event.location;
                            //$scope.event.imageList.push(photo);
                            found = true;
                            if($scope.newblog.events[eventsnapshot.key()] !== null)
                                $scope.newblog.events[eventsnapshot.key()].imageList.push(photo);
                            else{
                                //newevent.imageList.push(photo);
                                $scope.newblog.events[eventsnapshot.key()] = newevent;
                            }
                            loop.stop = true;
                        }
                    });
                }

                if(!found){
                    $scope.newblog.events[photo.date] = newevent;
                }
            });
        });

        //if($scope.newblog.events.length==0)
        //{
        //    $scope.event.title= (new Date()).getTime();
        //    $scope.event.description="Having fun with Triip, sorry no image now";
        //    $scope.newblog.events[$scope.event.title] = $scope.event;
        //
        //}

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
                    $scope.processImg(results[i])
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
        //var x = document.getElementById("test");
        //var newImg = new Image();
        //newImg.src = "img/Bush-dog.jpg"
        //console.log("hello");
        //var x = "data:image/jpeg;base64," + newImg;
        ////document.getElementById("test").onclick = function() {
        ////    console.log(this);
        ////    EXIF.getData(this, function() {
        ////        alert(EXIF.pretty(this));
        ////    });
        ////};
        //console.log(newImg);
        //EXIF.getData(newImg, function() {
        //    alert(EXIF.pretty(this));
        //});
        //console.log(x);
        //EXIF.getData(x, function(exifObject) {
        //    console.log(exifObject);
        //});

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

        $cordovaCamera.getPicture(options).then(img, function(err) {
            console.log(err);
            $scope.processImg(img);
        });
    };

    $scope.processImg = function(img){
        var imgURI = "data:image/jpeg;base64," + img;
        //$scope.newblog.img = results[i];

        var photo = {};
        photo.img = imgURI;

        EXIF.getData(img, function(exifObject) {
            if (EXIF.getTag(this, "DateTimeOriginal") == null)
                photo.date = (new Date(EXIF.getTag(this, "DateTimeOriginal"))).getTime();
            else
                photo.date = (new Date(EXIF.getTag(this, "DateTime"))).getTime();

            // GET LCOCATION NAME FROM LATTITUDE AND LONGTUTUDE
            if(EXIF.getTag(this, "GPSLatitude") !== null && EXIF.getTag(this, "GPSLongitude") !== null) {
                var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + EXIF.getTag(this, "GPSLatitude") +"," +  EXIF.getTag(this, "GPSLongitude") + "&key=AIzaSyB6LdCgpr-vnhuf9aC6RfslLWFiq41Bb7k";

                $.getJSON(geocodingAPI, function (json) {
                    if (json.status == "OK") {
                        //Check result 0
                        var result = json.results[0];
                        //look for locality tag and administrative_area_level_1
                        var city = "";
                        var state = "";
                        for (var i = 0, len = result.address_components.length; i < len; i++) {
                            var ac = result.address_components[i];
                            if (ac.types.indexOf("administrative_area_level_1") >= 0) state = ac.short_name;
                        }
                        if (state != '') {
                            console.log("Hello to you out there in " + city + ", " + state + "!");
                            photo.location = city;
                        }
                    }

                });
            }
        });
        $scope.photos.push(photo);
        $('#img-container').css('height','250px')
    };

}]);

