(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if (username == null || username == "") {
                vm.error = "Username is empty";
                return false;
            }
            if (password == null || password == "") {
                vm.error = "Password is Empty";
                return false;
            }
            if(password !== verifyPassword) {
                vm.error = "Password don't match";
                return false;
            }
            UserService
                .createUser(username, password)
                .then (
                    function(response) {
                        var user = response.data;
                        $location.url("/profile/"+user._id);

                    },
                    function(error) {
                        vm.error = error.data;
                    }

                )
        }
    }
})();
