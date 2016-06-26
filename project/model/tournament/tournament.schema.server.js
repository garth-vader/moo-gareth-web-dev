module.exports = function() {
    var mongoose = require("mongoose");

    var TournamentSchema = mongoose.Schema({
        name: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        tournament: [mongoose.Schema.Types.ObjectId],
        dateCreate: {type: Date, default: Date.now()},
        facebook: {
            id:    String,
            token: String,
            displayName: String
        }
    }, {collection: "assignment.user"});
    return TournamentSchema
};