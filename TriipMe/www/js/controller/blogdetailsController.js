TriipMeApp.controller('blogdetailsController',['$scope','$cordovaCamera','$state','$stateParams',function($scope,$cordovaCamera,$state,$stateParams){
    if(fb.getAuth().uid == "")
        $state.go("login");

    $scope.blogid = $stateParams.blogid;
    console.log($scope.blogid);
    $scope.blog = {};
    if($scope.blogid.length > 0)
    {
        fb.child("database").child("blogs").child($scope.blogid).once("value", function(data) {
            $scope.blog = data.val();
        });
    }

    $scope.blog.events = [];
    $scope.blog.desc = "We are team #Truust."
    $scope.blog.img = 'img/blogCover.jpg';
    $scope.blog.title = "OpEEE APCS 2015"

    var event1 = {};
    event1.imgs = [];
    event1.imgs.push('img/event2.jpg');
    event1.time = (new Date(2015, 07, 17, 8, 13, 0, 0)).toDateString();
    event1.desc = "Interesting checkpoint session #OpEEE";

    $scope.blog.events.push(event1);

    var event = {};
    event.imgs = [];
    event.imgs.push('img/event1.jpg');
    event.imgs.push('img/event1_2.jpg');
    event.time = (new Date(2015, 07, 25, 8, 13, 0, 0)).toDateString();
    event.desc = "Cozy dinner at #Ganh with everyone";

    $scope.blog.events.push(event);

}]);