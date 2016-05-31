(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
                {_id: "123", username: "alice", password: "alice", email: "alice@alice.com", firstName: "Alice", lastName: "Wonder"},
                {_id: "234", username: "bob", password: "bob", email:"bob@bob.com", firstName: "Bob", lastName: "Marley"},
                {_id: "345", username: "charly", password: "charly", email:"charly@charly.com", firstName: "Charly", lastName: "Garcia"},
                {_id: "456", username: "jannunzi", password: "jannunzi", email:"jannunzi@junnunzi.com", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser

        };
        return api;

        function createUser(user) {
            if (findUserById(user._id) === null &&
                findUserByUsername(user.username) === null) {
                users.push(user);
                return true;
            }
            return false;

        }
        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username === username) {
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password) {

                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function findUserById(id) {
            for (var i in users) {
                if (users[i]._id === id) {
                    return angular.copy(users[i]);
                }
            }
            return null
        }

        function updateUser(id, newUser) {
            for (var i in users) {
                if (id !== null && users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    users[i].password = newUser.password;
                    users[i].email = newUser.email;

                    return true;
                }
            }
            return false;
        }

        function deleteUser(userId) {
            var bool = false;
            for (var i in users) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                    bool =  true;
                }
            }
            return bool;
        }

    }
})();