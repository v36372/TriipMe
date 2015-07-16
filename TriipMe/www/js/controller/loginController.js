TriipMeApp.controller('loginController',['$scope','$location','$ionicPopup',function($scope,$location,$ionicPopup){

    // VARIABLES INITIALIZATION
    $scope.username = "";
    $scope.password = "";

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
                console.log("Authenticated successfully with payload:", authData);
                console.log($location.path());
                //$location.path('/home');
                $scope.$apply(function() { $location.path("/home"); });
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