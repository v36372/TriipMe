TriipMeApp.controller('homeController',['$scope','$state',function($scope,$state){
    $scope.redir = function(){
        //if (!$scope.$$phase) {
        //    $scope.$apply(function() { $location.path("/create"); });
        //}
        //$location.path("/create");

        $state.go("create");
    };
}]);