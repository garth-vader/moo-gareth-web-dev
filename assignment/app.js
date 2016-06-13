module.exports = function(app) {

    var models = require("./model/models.server.js")();
    var userService = require("./services/user.service.server.js")(app, models);
    var websiteService = require("./services/website.service.server.js")(app, models);
    var pageService = require("./services/page.service.server.js")(app);
    var widgetService = require("./services/widget.service.server.js")(app);
    //var flickrService = require("./services/flickr.service.server.js")(app);
    //var jgaDirectives = require("./directives/")

    app.get("/allusers/:username", function(req, res){
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