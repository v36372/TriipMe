TriipMeApp.controller('MainController', ['$scope','$state','$ionicPopover','$ionicPopup',function ($scope,$state,$ionicPopover,$ionicPopup) {
  $scope.headerGoBack = function () {
    $ionicHistory.goBack();
    console.log("hello");
  }

  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Title</h1> </ion-header-bar> <ion-content>Hello</ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Leave us',
      template: 'Are you sure you want to log out?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
        $state.go("login");
        $scope.closePopover();
      } else {
        console.log('You are not sure');
        $scope.closePopover();
      }
    });
  };

  $scope.isLoggedIn = false;
  //console.log(fb.getAuth().uid);
  //console.log($state);
  //$scope.url = $state.url();
}]);