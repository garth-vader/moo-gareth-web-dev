module.exports = function() {
    var mongoose = require("mongoose");

    var TournamentSchema = mongoose.Schema({
        _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        description: String,
        location: String,
        fencers: [{
            checkedIn: {
                type: Boolean,
                default: false
            },
            fencer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        }],
        dateCreate: {type: Date, default: Date.now()},
    }, {collection: "project.tournament"});
    return TournamentSchema
};