TriipMeApp.controller('blogeditController',['$scope','$cordovaCamera','$state',function($scope,$cordovaCamera,$state){
    if(fb.getAuth().uid == "")
        $state.go("login");

    $scope.imgs = [];
    $scope.event = {};

    $scope.event.title = "";
    $scope.event.desc = "";
    $scope.location = "";

    $scope.addEvent = function(){

    };

}]);