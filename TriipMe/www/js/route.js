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
        .state('profile',{
            params: {
                userid:{}
            },
            url: '/profile',
            templateUrl: 'view/profilePage.html',
            controller: "profileController",
            data: {'userid':'userid'}
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
        })
        .state("blogdetails", {
            params: {
                blogid:{}
            },
            url: "/blog",
            templateUrl: "view/blogdetailsPage.html",
            controller: "blogdetailsController",
            data: {'blogid':'blogid'}
    });
    $urlRouterProvider.otherwise('/');
});