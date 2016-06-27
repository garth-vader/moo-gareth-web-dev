module.exports = function() {

    var mongoose = require("mongoose");
    var TournamentSchema = require("./tournament.schema.server.js")();
    var Tournament = mongoose.model("Tournament", TournamentSchema);

    var api = {
        createTournament: createTournament,
        findTournamentById: findTournamentById,
        // findTournamentByName: findTournamentByName,
        // checkinByUser: checkinByUser,
        findAllTournamentForUser: findAllTournamentForUser,
        updateTournament: updateTournament,
        deleteTournament: deleteTournament
    };
    return api;

    function createTournament(userId, tournament) {
        tournament._creator = userId;
        return Tournament.create(tournament);
    }

    function findAllTournamentForUser(userId) {
        return Tournament.find({_creator: userId});
    }
    function findTournamentById(TournamentId) {
        return Tournament.findById(TournamentId);
    }

    function updateTournament(TournamentId, Tournament) {
        return Tournament.update(
            {_id: TournamentId},
            {$set :
            {


            }
            }
        )
    }

    function deleteTournament(TournamentId) {
        return Tournament.remove(TournamentId);
    }
};