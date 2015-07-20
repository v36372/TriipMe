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
    $scope.blog.desc = "It was the best thing that ever happened."
    $scope.blog.img = 'img/hong-kong.jpg';
    $scope.blog.title = "Destined Hong Kong"

    var event = {};
    event.imgs = [];
    event.imgs.push('img/lankwaifong.jpg');
    event.imgs.push('img/girl.jpg');
    event.time = (new Date()).toDateString();
    event.desc = "I went to Lan Kwai Fong and met my soul mate there. It's destiny.";

    $scope.blog.events.push(event);

    var event1 = {};
    event1.imgs = [];
    event1.imgs.push('img/hongkong2.jpg');
    event1.time = (new Date()).toDateString();
    event1.desc = "I enjoyed the rest of the trip with Hong Kong traditional festival.";

    $scope.blog.events.push(event1);
}]);