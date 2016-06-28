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
            .when( "/logout", {
                templateUrl: "views/user/login.view.client.html",
                resolve: {
                    logout: logout
                }
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
            .when("/user/:uid/tournament/new", {
                templateUrl: "views/tournament/tournament-new.view.client.html",
                controller: "TournamentNewController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/tournament/:tid", {
                templateUrl: "views/tournament/tournament-edit.view.client.html",
                controller: "TournamentEditController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/tournament/:tid/view", {
                templateUrl: "views/tournament/tournament-view.view.client.html",
                controller: "TournamentViewController",
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

        function logout(UserService, $rootScope, $location) {
            UserService
                .logout()
                .then(function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/login")
                    });

        }
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
