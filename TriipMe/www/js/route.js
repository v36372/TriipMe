//TriipMeApp.config(['$routeProvider',function ($routeProvider){
//    $routeProvider
//    .when('/',{
//        templateUrl:"view/loginPage.html",
//        controller:"loginController"
//    })
//    .when('/home',{
//        templateUrl:"view/homePage.html",
//        controller:"homeController"
//    })
//    .when('/create',{
//        templateUrl:"view/blogcreatePage.html",
//        controller:"blogcreateController"
//    })
//}]);

TriipMeApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("login", {
            url: "/",
            templateUrl: "view/loginPage.html",
            controller: "loginController"
        })
        .state("home", {
            url: "/home",
            templateUrl: "view/homePage.html",
            controller: "homeController"
        })
        .state("create", {
            url: "/create",
            templateUrl: "view/blogcreatePage.html",
            controller: "blogcreateController"
        });
    $urlRouterProvider.otherwise('/');
});