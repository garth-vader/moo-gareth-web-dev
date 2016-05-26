(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
    var users =
        [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ]

    function LoginController($location) {
        var vm = this;
        vm.login = login;
        function login(username, password) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password) {
                    var id = users[i]._id;
                    $location.url("/profile/" + id);
                }
                else {
                    vm.error = "User not found";
                }
            }
        }
    }
})();
