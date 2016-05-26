(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)
    
    var users =
        [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ]

    function ProfileController($routeParams) {
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams["id"];
        var index = -1;
        console.log(id);
        function init() {
            for (var i in users) {
                if (users[i]._id === id) {
                    vm.user = angular.copy(users[i]);
                    index = i;
                }
            }
        }

        init();
        function updateUser() {
            users[index].firstName = vm.user.firstName;
            users[index].lastName = vm.user.lastName;
            vm.success = "User successfully update";
        }
    }
})();