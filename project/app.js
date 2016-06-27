module.exports = function(app) {

    var models = require("./model/models.server.js")();
    var userService = require("./services/user.service.server.js")(app, models);
    var tournamentService = require("./services/tournament.service.server")(app, models);

};