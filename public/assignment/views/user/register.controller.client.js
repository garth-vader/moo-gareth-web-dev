(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if(password != verifyPassword) {
                vm.error = "Could not verify password";
                return false;
            }
            var user = {};
            user._id = ((new Date()).getTime());
            user.username = username;
            user.password = password;
            if (UserService(user)) {
                
            } else {

            }
            
        }
    }
})();
