TriipMeApp.factory("Auth", function($firebaseAuth) {
    var usersRef = new Firebase("https//triipme.firebaseio.com/users");
    return $firebaseAuth(usersRef);
});