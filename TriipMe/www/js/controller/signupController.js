TriipMeApp.controller('signupController', ['$scope',function ($scope) {
    $scope.err = "";
    $scope.newUsername = "";
    $scope.newPassword = "";
    console.log("sdfsdf");
    $scope.create = function() {
        console.log('Closing in controller!');
        if($scope.newPassword !== $scope.newPassword2) {
            $scope.err = "Passwords do not match";
            return;
        }

        fb.createUser({
            email    : $scope.newUsername,
            password : $scope.newPassword
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
            }
        });
    };

    $scope.cancel = function() {
        console.log('Closing in controller!');
        $scope.popup.close();
    };

}]);