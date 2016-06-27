module.exports = function() {
    var mongoose = require("mongoose");

    var TournamentSchema = mongoose.Schema({
        _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        description: String,
        location: String,
        fencerCheckIn: [{
            checkedIn: Boolean,
            fencerName: String
        }],
        dateCreate: {type: Date, default: Date.now()},
    }, {collection: "project.tournament"});
    return TournamentSchema
};