TriipMeApp.controller('loginController',['$scope','$ionicPopup','$state','$timeout',function($scope,$ionicPopup,$state,$timeout){

    // VARIABLES INITIALIZATION
    $scope.logInfo = {};
    $scope.logInfo.username = "";
    $scope.logInfo.password = "";

    $scope.login = function () {
        $scope.show();
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
                $scope.showAlert("Wrong credentials","Check your information and try again");
            } else {
                //console.log(authData.uid.substr(authData.uid.indexOf(":")+1,authData.length));
                //console.log($location.path());
                //$location.path('/home');

                //if (!$scope.$$phase) {
                //    $scope.$apply(function() { $location.path("/home"); });
                //}
                fb.child("database").child("users").child(fb.getAuth().uid).child("name").once("value", function (data) {
                    NameOfUser = data.val();
                    //$scope.hide();
                    $state.go("home");
                });
                //NameOfUser = fb.child("database").child("users").child(fb.getAuth().uid).child("name").val();
            }
        });
    };

    $scope.showAlert = function (title,template) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: template
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

    //LOGIN WITH FACEBOOK
    $scope.loginwithFacebook = function() {
        $scope.show();
        fb.authWithOAuthPopup("facebook", function (error, authData) {
            $scope.hide();
            if (error) {
                //console.log("Login Failed!", error);
                //$scope.showAlert();
            } else {
                //console.log(authData.uid.substr(authData.uid.indexOf(":")+1,authData.length));
                //console.log($location.path());
                //$location.path('/home');

                //if (!$scope.$$phase) {
                //    $scope.$apply(function() { $location.path("/home"); });
                //}
                var newUser = {};
                newUser.name = fb.getAuth().facebook.displayName;
                newUser.provider = "facebook";
                newUser.avatar = fb.getAuth().facebook.profileImageURL;
                fb.child("database").child("users").child(fb.getAuth().uid).update(newUser);
                NameOfUser = fb.getAuth().facebook.displayName;
                $state.go("home");
                //NameOfUser = fb.child("database").child("users").child(fb.getAuth().uid).child("name").val();
            }
        });
    }

}]);