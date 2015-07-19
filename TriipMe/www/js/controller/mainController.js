TriipMeApp.controller('MainController', ['$scope', function ($scope) {
  $scope.headerGoBack = function () {
    $ionicHistory.goBack();
    console.log("hello");
  }
}]);