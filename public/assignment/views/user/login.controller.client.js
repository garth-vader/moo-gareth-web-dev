(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {

        var vm = this;

        vm.login = login;
        vm.register = register;

        function login(username, password) {
            if (username === "" || username === undefined) {
                vm.error = "Username must have a Value";
                return null;
            }
            if (password === "" || password === undefined) {
                vm.error = "Password must have a Value";
                return null;
            }
            var user =
            {
                username: username,
                password: password
            };
            UserService
                .login(user)
                .then(
                    function (response) {
                        //console.log(response.data);
                        var user = response.data;
                        if (user === null) {
                            vm.error = "User not found";
                        } else {
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        }
                    },
                    function (error) {
                        vm.error = "Unauthorized: Access is denied due to invalid credentials";
                    });
        }


        function register(username, password, verifyPassword) {
            if (username == null || username == "") {
                vm.error = "Username is empty";
                return false;
            }
            if (password == null || password == "") {
                vm.error = "Password is Empty";
                return false;
            }
            if (password !== verifyPassword) {
                vm.error = "Password don't match";
                return false;
            }
            var user =
            {
                username: username,
                password: password
            };
            UserService
                .register(user)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user == null) {
                            vm.error = error.data;
                        } else {
                            $rootScope.currentUser = user;
                            $location.url("/profile/" + user._id);
                            login(username, password);

                        }

                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

    }
})();