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
            vm.user = UserService.findUserById(id);
        }
        init();

        function updateUser() {
            if (UserService.updateUser(vm.user._id, vm.user)) {
                vm.success = "User Successfully Updated";
                init();
            } else {
                vm.error = "Unable to Update";
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