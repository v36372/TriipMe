TriipMeApp.controller('blogdetailsController',['$scope','$cordovaCamera','$state','$stateParams',function($scope,$cordovaCamera,$state,$stateParams){
    if(fb.getAuth().uid == "")
        $state.go("login");

    console.log($stateParams.blogid);
    $scope.blogid = $stateParams.blogid;
}]);