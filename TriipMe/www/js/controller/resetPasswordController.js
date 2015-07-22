TriipMeApp.controller('resetPasswordController',['$scope','$state','$stateParams',function($scope, $state,$stateParams){
	$('#myTab').css('display','none');
	$scope.password = {}
	$scope.password.pass1 = "";
	$scope.password.pass2 = "";	
	$scope.resetPassword = resetPassword;
	$scope.backToLogin = backToLogin;	
	function resetPassword(){
		if ($scope.password.pass1 !== $scope.password.pass2){
			alert("passwords do not match")
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
					console.log("Password changed successfully");
					var userId = fb.getAuth().uid;
					fb.child('database').child('users').child(userId).once('value',function(data){
						var updateUser = data.val();
						updateUser.firstLogin = false;
						fb.child('database').child('users').child(userId).update(updateUser);
						fb.child("database").child("users").child(userId).once("value", function (data) {
							NameOfUser = data.child("name").val();
							AvatarOfUser = data.child("avatar").val();
							$('#myTab').css('display', 'block');
						//	$scope.activateHomeTab();
							$state.go("home");
						});					
					})					 										
				} else {
					console.log("Error changing password:", error);
				}
			});		
		}
	};
	
	function backToLogin(){
		$state.go('login');	
	}
}])