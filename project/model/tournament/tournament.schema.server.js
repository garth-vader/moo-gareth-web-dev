module.exports = function() {
    var mongoose = require("mongoose");

    var TournamentSchema = mongoose.Schema({
        name: String,
        location: String,

        fencersInv: {type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'},
        dateCreate: {type: Date, default: Date.now()},
    }, {collection: "project.tournament"});
    return TournamentSchema
};