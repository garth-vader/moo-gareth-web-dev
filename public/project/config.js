(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when( "/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/tournament", {
                templateUrl: "views/tournament/tournament-list.view.client.html",
                controller: "TournamentListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .otherwise({
                templateUrl: "views/home/home.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            });

        function checkLoggedIn(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLoggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        if(user == '0') {
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/home")
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        console.log(err);
                        $rootScope.currentUser = null;
                        deferred.reject();
                    }
                );

            return deferred.promise;
        }
    }
})();
