(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        var id = $routeParams["uid"];
        console.log(id);
        function init() {
            UserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;
                });
        }
        init();

        function updateUser() {
            var result = UserService.updateUser(vm.user._id, vm.user);
            if(result === true) {
                vm.success = "User successfully updated";
            } else {
                vm.error = "User not found";
            }
        }
        function deleteUser() {
            if (UserService.deleteUser(id)) {
                vm.success = "User Successfully Deleted";
                $location.url("login");
            }
            else {
                vm.error = "User NOT Deleted";
            }
        }
    }
})();