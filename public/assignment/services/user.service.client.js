(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

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
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
        
        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
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