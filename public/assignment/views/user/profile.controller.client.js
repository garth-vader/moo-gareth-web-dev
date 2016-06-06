(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        var id = $routeParams["uid"];

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                });
        }

        init();

        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(
                    function (response) {
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