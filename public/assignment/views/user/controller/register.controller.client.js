(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if(password === verifyPassword) {
                var user = {};
                user._id = ((new Date()).getTime());
                user.password = password;
                console.log(user);
                if (UserService.createUser(user)) {
                    var id = user._id;
                    $location.url("/users/" + id);
                } else {
                    vm.error = "Duplicated User Found";
                }

            } else {
                vm.error ="Could not verify password";
            }

        }
    }
})();
