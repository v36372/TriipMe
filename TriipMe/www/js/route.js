TriipMeApp.config(['$routeProvider',function ($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:"view/loginPage.html",
        controller:"loginController"
    })
    .when('/home',{
        templateUrl:"view/homePage.html",
        controller:"homeController"
    })
}]);
