TriipMeApp.controller('resetPasswordController',['$scope','$ionicPopup','$state','$stateParams',function($scope,$ionicPopup, $state,$stateParams){
	$('#myTab').css('display','none');
	$scope.password = {}
	$scope.password.pass1 = "";
	$scope.password.pass2 = "";	
	$scope.resetPassword = resetPassword;
	$scope.backToLogin = backToLogin;	
	$scope.showAlert = showAlert;
	$scope.activateHomeTab = activateHomeTab;
	
	function resetPassword(){
		if ($scope.password.pass1 !== $scope.password.pass2){
			$scope.showAlert('passwords you entered did not match');
		}else{			
			var userAccount = $stateParams.userAccount;
			var email = userAccount.email;
			var oldPassword = userAccount.password;
			var newPassword = $scope.password.pass1;
			fb.changePassword({
				email: email,
				oldPassword: oldPassword,
				newPassword: newPassword,
			},function(error) {
				if (error === null) {					
					var userId = fb.getAuth().uid;
					fb.child('database').child('users').child(userId).once('value',function(data){
						var updateUser = data.val();
						updateUser.firstLogin = false;
						fb.child('database').child('users').child(userId).update(updateUser);
						fb.child("database").child("users").child(userId).once("value", function (data) {
							NameOfUser = data.child("name").val();
							AvatarOfUser = data.child("avatar").val();
							$('#myTab').css('display', 'block');
							$scope.activateHomeTab();							 
							$state.go("home");
						});					
					})					 										
				} else {
					console.log("Error changing password:", error);
					$scope.showAlert("Crash","something goes wrong, reset password unsuccessfully");
				}
			});		
		}
	};
	
	function backToLogin(){
		$state.go('login');	
	}
	
	function showAlert(title,template) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: template
        });
        alertPopup.then(function (res) {
            //console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
	
	function activateHomeTab(){
        $('#homeTab').addClass('active');
        $('#profileTab').removeClass('active');
        $('#favoriteTab').removeClass('active');
        $('#settingTab').removeClass('active');
    }
}])