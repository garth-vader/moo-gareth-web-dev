module.exports = function(app, models) {

    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];


    app.post("/api/user", createUser);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get("/api/loggedin", loggedin);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function register (req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user == null) {
                        return done(null, false);
                    }
                    if(user.username === username && password === user.password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    res.json(newUser)
                },
                function(error) {
                    res.status(400).send("Username " + newUser.username + " is already in use");
                }
            );

        /*        for(var i in users) {
         if(users[i].username === newUser.username) {
         res.status(400).send("Username " + newUser.username + " is already in use");
         return;
         }
         }

         newUser._id = (new Date()).getTime() + "";
         users.push(newUser);
         res.json(newUser);*/
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );
        /*        for(var i in users) {
         if(users[i]._id === id) {
         users.splice(i, 1);
         res.send(200);
         return;
         }
         }
         res.status(404).send("Unable to remove user with ID: " + id);*/
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send("User with ID: "+ id +" not found");
                }
            );
        /*        for(var i in users) {
         if(users[i]._id === id) {
         users[i].firstName = newUser.firstName;
         users[i].lastName = newUser.lastName;
         res.sendStatus(200);
         return;
         }
         }
         res.status(400).send("User with ID: "+ id +" not found");*/
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
// /*        for(var i in users) {
//             if(userId === users[i]._id) {
//                 res.send(users[i]);
//                 return;
//             }
//         }
//         res.send({});*/
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(400).send("User with name: " + username + " was not found.");
                }
            );
        // for(var u in users) {
        //     if(users[u].username === username && users[u].password === password) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.sendStatus(403);
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.sendStatus(403);
                }
            );
        // for(var u in users) {
        //     if(users[u].username === username) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send({});
    }
};