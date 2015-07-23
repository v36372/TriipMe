TriipMeApp.controller('loginController',['$scope','$ionicPopup','$state','$timeout',function($scope,$ionicPopup,$state,$timeout){

    // VARIABLES INITIALIZATION
    $scope.activateHomeTab = function(){
        $('#homeTab').addClass('active');
        $('#profileTab').removeClass('active');
        $('#favoriteTab').removeClass('active');
        $('#settingTab').removeClass('active');
    }
    $scope.logInfo = {};
    $scope.logInfo.username = "";
    $scope.logInfo.password = "";
    $('#myTab').css('display','none');
    $('#navBar').css('display','none');
    $('#loginPage').css('top','0px');

    //fb.onAuth(function(authData) {
    //    $scope.show();
    //    $state.go("home");
    //    $scope.hide();
    //    if (fb.getAuth().provider == "facebook") {
    //        var newUser = {};
    //        newUser.name = fb.getAuth().facebook.displayName;
    //        newUser.provider = "facebook";
    //        newUser.avatar = fb.getAuth().facebook.profileImageURL;
    //        fb.child("database").child("users").child(fb.getAuth().uid).update(newUser);
    //        NameOfUser = fb.getAuth().facebook.displayName;
    //        AvatarOfUser = fb.getAuth().facebook.profileImageURL;
    //        $('#myTab').css('display','block');
    //        $scope.activateHomeTab();
    //        $scope.hide();
    //        $state.go("home");
    //    }
    //
    //    //$timeout(function(){$scope.hide();},5000);
    //});

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
                
                fb.child("database").child("users").child(fb.getAuth().uid).once("value", function (data) {
                    NameOfUser = data.child("name").val();
                    AvatarOfUser = data.child("avatar").val();
                    NotiSeen = data.child("noti").child("noti_seen");
                    var isFirstLogin = data.child('firstLogin').val();
                    if (isFirstLogin){                        
                        var userAccount = {};
                        userAccount.email = $scope.logInfo.username;
                        userAccount.password = $scope.logInfo.password;   
                        if (!$('#accountLog').is(':checked')){
                            $scope.logInfo.username = "";                                                         
                        }                      
                        $scope.logInfo.password = "";
                        $state.go('resetpassword', {userAccount:userAccount});
                    }else{
                        //$scope.hide();
                        $('#myTab').css('display','block');
                        $('#navBar').css('display','block');
                        $scope.activateHomeTab();                        
                        if (!$('#accountLog').is(':checked')){
                            $scope.logInfo.username = "";
                            $scope.logInfo.password = "";                             
                        }                        
                        $state.go("home");   
                    }                    
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

        //var ref = window.open('', '_blank', 'location=no');

        fb.authWithOAuthPopup("facebook", function (error,authData) {
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
                //newUser.noti = {};
                fb.child("database").child("users").child(fb.getAuth().uid).child("noti").once("value",function(snap){
                    if (snap.val() !== null){
                        //var NotiSeen = snap.child("noti_seen").val();
                        newUser.noti = snap.val();
                        console.log("haha");
                    }
                    else {
                        newUser.noti = {};
                        newUser.noti.noti_seen = true;
                        console.log("firsttime");
                    }
                    fb.child("database").child("users").child(fb.getAuth().uid).update(newUser);
                    NameOfUser = fb.getAuth().facebook.displayName;
                    AvatarOfUser = fb.getAuth().facebook.profileImageURL;
                    $('#myTab').css('display','block');
                    $('#navBar').css('display','block');
                    $scope.activateHomeTab();
                    $state.go("home");
                });
                //NameOfUser = fb.child("database").child("users").child(fb.getAuth().uid).child("name").val();
            }
        });
    }
}]);