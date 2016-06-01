module.exports = function(app) {

    var userService = require("./services/user.services.server.js");
    userService(app);


    app.get("/allUsers/:username", function(req, res){
        var username = req.params['username'];
        for(var i in users) {
            if(users[i].username === username) {
                res.send(users[i]);
            }
        }
    });

    app.get("/say/:message", function(req, res) {
        var msg = req.params["message"];
        res.send({message: msg});
    });
};