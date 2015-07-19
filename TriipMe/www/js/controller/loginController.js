TriipMeApp.controller('loginController', ['$scope', '$ionicPopup', '$state','$timeout','$ionicLoading', function ($scope, $ionicPopup, $state,$timeout,$ionicLoading) {

    // VARIABLES INITIALIZATION
    $scope.username = "nguyentrongtin2331@gmail.com";
    $scope.password = "admin";

    $scope.show = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-positive"></ion-spinner>'
        });
    };
    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.login = function () {
        $scope.show();
        console.log($scope.username);
        console.log($scope.password);
        if ($scope.username == "" || $scope.password == "")
            return;
        fb.authWithPassword({
            email: $scope.username,
            password: $scope.password
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

    $scope.signUp = function () {
        //$scope.data = {}
        //
        //// An elaborate, custom popup
        //var myPopup = $ionicPopup.show({
        //    templateUrl: '../../view/signUp.html',
        //    title:'Sign up',
        //    subTitle: 'Create a new account'
        //});
        //myPopup.then(function (res) {
        //    console.log('Tapped!', res);
        //});
        //
        //$scope.myPopup = myPopup;
        //console.log("open");
        //$timeout(function () {
        //    myPopup.close(); //close the popup after 3 seconds for some reason
        //}, 3000);
    };

    $scope.cancel = function(){
        console.log("cclose");
        $scope.myPopup.close();
    };

}]);