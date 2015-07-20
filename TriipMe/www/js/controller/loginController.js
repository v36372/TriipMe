TriipMeApp.controller('loginController',['$scope','$ionicPopup','$state','$timeout',function($scope,$ionicPopup,$state,$timeout){

    // VARIABLES INITIALIZATION
    $scope.logInfo = {};
    $scope.logInfo.username = "";
    $scope.logInfo.password = "";

    $scope.login = function () {
        $scope.show();
        console.log($scope.logInfo.username);
        console.log($scope.logInfo.password);
        if ($scope.logInfo.username == "" || $scope.logInfo.password == "") {
            $scope.hide();
            //$scope.username = "hihji";
            return;
        }
        fb.authWithPassword({
            email: $scope.logInfo.username,
            password: $scope.logInfo.password
        }, function (error, authData) {
            $scope.hide();
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
                fb.child("database").child("users").child(fb.getAuth().uid).child("name").once("value", function (data) {
                    NameOfUser = data.val();
                });
                //NameOfUser = fb.child("database").child("users").child(fb.getAuth().uid).child("name").val();
                $state.go("home");
            }
        });
    };

    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Wrong Credentials',
            template: 'Check your Email,Password and try again'
        });
        alertPopup.then(function (res) {
            //console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
    //var savedPopup;
    $scope.popup;

    $scope.signUp = function() {
        $scope.popup = $ionicPopup.show({
            templateUrl:  'view/signUp.html',
            title: 'Join us',
            scope: $scope,
            controller:'signupController',
        });
    }
}]);