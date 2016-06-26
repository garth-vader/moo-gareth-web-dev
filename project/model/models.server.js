module.exports = function() {
    var mongoose = require('mongoose');
    var monString = 'mongodb://localhost/fencingTourny';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        monString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    mongoose.connect(monString);

    var userModel = require("./users/user.model.server.js")();
    var tournamentModel = require("./tournament/tournament.model.server.js")();

    
    var models = {
        userModel: userModel,
        tournamentModel: tournamentModel
    };

    return models
};