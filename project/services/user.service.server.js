module.exports = function(app, models) {

    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };


    // app.post("/api/user", createUser);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get("/api/user/search/:text", search);
    app.get("/api/loggedin", loggedin);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }))
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
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
        user.password = bcrypt.hashSync(user.password);

        userModel
            .findUserByUsername(user.username)
            .then(
                function(resp) {
                    if (resp == null) {
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
                        return;
                    } else {
                        res.status(400).send("user already exists");
                        return;
                    }
                });

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
                    if(user.username === username && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        var newUser = {
            username: profile.displayName.replace(/ /g, ''),
            facebook: {
                id: profile.id,
                displayName: profile.displayName,
                token: token
            }
        };
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        return userModel.createUser(newUser);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );
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
    }

    function search(req, resp) {
        var searchText = req.params["text"];
        userModel
            .search(searchText)
            .then(
                function (users) {
                    resp.json(users);
                },
                function (err) {
                    resp.status(400).send(err);
                }
            );
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
    }
};