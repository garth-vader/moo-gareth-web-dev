(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        var id = $rootScope.currentUser._id;

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                });
        }

        init();

        function logout() {
            UserService
                .logout(vm.user)
                .then(
                    function(response) {
                        console.log(response.data);
                        $rootScope.currentUser = null;
                        $location.url("/");
                    }
                );
        }

        function updateUser() {
            if (vm.user.username == null || vm.user.username == "") {
                vm.error = "Username is empty";
                return false;
            }
            /*            if (vm.user.email == null || vm.user.email == "") {
             vm.error = "Email is Empty";
             return false;
             }*/
            if (vm.user.firstName == null || vm.user.firstName == "") {
                vm.error = "First name is Empty";
                return false;
            }
            if (vm.user.lastName == null || vm.user.lastName == "") {
                vm.error = "Last name is Empty";
                return false;
            }
            UserService
                .updateUser(id, vm.user)
                .then(
                    function (response) {
                        init();
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }

        function deleteUser() {
            UserService
                .deleteUser(id)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

    }

})();