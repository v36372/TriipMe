TriipMeApp.controller('notificationController',['$scope','$state',function($scope,$state){
    $scope.notiList = [];
    NotiSeen = true;
    var notiRef = fb.child("database").child("users").child(fb.getAuth().uid).child("noti");

    notiRef.update({"noti_seen":NotiSeen});

    notiRef.orderByKey().limitToLast(5).on("child_added",function(snapshot){
        var noti = snapshot.val();
        noti.time = $scope.utilDateFormat(snapshot.val().time);
        $scope.notiList.push(noti);
    });

    $scope.gotoBlog = function(blogid){
        //BlogID = fb.child("database").child("users").child(fb.getAuth().uid).child("blogs")
        console.log(blogid);
        if(blogid !== null)
            $state.go("blogdetails",{blogid:blogid});

    };
}]);

