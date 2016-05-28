(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams["id"];
        var index = -1;
        console.log(id);
        function init() {
            vm.user = UserService.findUserById(id);
        }

        init();
        function updateUser() {
            users[index].firstName = vm.user.firstName;
            users[index].lastName = vm.user.lastName;
            vm.success = "User successfully update";
        }
    }
})();