TriipMeApp.controller('MainController', ['$scope', function ($scope) {
  $scope.headerGoBack = function () {
    $ionicHistory.goBack();
    console.log("hello");
  }

  $scope.isLoggedIn = false;
  console.log(fb.getAuth().uid);
}]);