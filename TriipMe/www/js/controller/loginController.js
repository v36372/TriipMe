TriipMeApp.controller('loginController',['$scope','$ionicPopup','$state',function($scope,$ionicPopup,$state){

    // VARIABLES INITIALIZATION
    $scope.username = "nguyentrongtin2331@gmail.com";
    $scope.password = "admin";

    console.log("asddas");
    $scope.login = function() {
        console.log($scope.username);
        console.log($scope.password);
        if($scope.username == "" || $scope.password == "")
            return;
        var ref = new Firebase("https://triipme.firebaseio.com");
        ref.authWithPassword({
            email    : $scope.username,
            password : $scope.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                $scope.showAlert();
            } else {
                //console.log(authData.uid.substr(authData.uid.indexOf(":")+1,authData.length));
                //console.log($location.path());
                //$location.path('/home');

                //if (!$scope.$$phase) {
                //    $scope.$apply(function() { $location.path("/home"); });
                //}

                $state.go("home");
            }
        });
    };

    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Wrong Credentials',
            template: 'Check your Email,Password and try again'
        });
        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
}]);