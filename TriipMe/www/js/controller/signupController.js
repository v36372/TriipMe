TriipMeApp.controller('signupController', ['$scope','$state',function ($scope,$state) {
    $scope.err = "";
    $scope.userName = "";
    $scope.userEmail = "";
    $scope.userPassword = "";
    $scope.createUser = function() {
        if($scope.userPassword !== $scope.confirmPassword) {
            $scope.err = "Passwords do not match";
            return;
        }
        fb.createUser({
            email    : $scope.userEmail,
            password : $scope.userPassword
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {                
                var newUser = {};
                newUser[userData.uid] = {};
                newUser[userData.uid].name = $scope.userName; //  CHANGE WITH ACTUAL DATA
                newUser[userData.uid].provider = "password"; //  CHANGE WITH ACTUAL DATA
                newUser[userData.uid].avatar = "img/avatar.jpg"; //  CHANGE WITH ACTUAL DATA          
                fb.child("database").child("users").update(newUser);                
                $scope.popup.close();
                $scope.login();
            }
        });
    };
    $scope.cancelSignup = function() {
        console.log('Closing in controller!');
        $scope.popup.close();
    };        
    $scope.login = function () {
        $scope.show();        
        fb.authWithPassword({
            email: $scope.userEmail,
            password: $scope.userPassword
        }, function (error, authData) {
            $scope.hide();
            if (error) {
                console.log("Login Failed!", error);
                $scope.showAlert();
            } else {
                //fb.child("database").child("users").child(fb.getAuth().uid).update(newUser);
                //fb.child("database").child("users").child(fb.getAuth().uid).child("name").once("value", function (data) {
                //    NameOfUser = data.val();
                //    $state.go("home");
                //});
                fb.child("database").child("users").child(fb.getAuth().uid).once("value", function (data) {
                    NameOfUser = data.child("name").val();
                    AvatarOfUser = data.child("avatar").val();
                    //$scope.hide();
                    $('#myTab').css('display','block');
                    $scope.activateHomeTab();
                    $state.go("home");
                });
            }
        });
    };        
}]);