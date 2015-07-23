TriipMeApp.controller('notificationController',['$scope','$state',function($scope,$state){
    $scope.notiList = [];

    var notoRef = fb.child("database").child("users").child(fb.getAuth().uid).child("noti");

    notiRef.orderByKey().on("child_added",function(snapshot){
        var noti = snapshot.val();
        noti.time = $scope.utilDateFormat(snapshot.val().time);
        $scope.notiList.push(noti);
    });

    $scope.gotoBlog = function(blogid){
        //BlogID = fb.child("database").child("users").child(fb.getAuth().uid).child("blogs")
        $state.go("blogdetails",{blogid:blogid});

    };
}]);

