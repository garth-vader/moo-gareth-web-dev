module.exports = function() {

    var mongoose = require("mongoose");
    var TournamentSchema = require("./tournament.schema.server.js")();
    var Tournament = mongoose.model("Tournament", TournamentSchema);

    var api = {
        createTournament: createTournament,
        findTournamentById: findTournamentById,
        findTournamentByFencer: findTournamentByFencer,
        checkInFencer: checkInFencer,
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

    function findTournamentById(tournamentId) {
        return Tournament
            .findById(tournamentId)
            .populate({
                path: 'fencers',
                populate: {
                    path: 'fencer',
                    model: 'User'
                }
            });
    }
    
    function findTournamentByFencer(userId) {
        return Tournament.find({'fencers.fencer': userId});

    }

    function checkInFencer(userId, tournamentId) {
        return Tournament
            .findById(tournamentId)
            .populate({
                path: 'fencers',
                populate: {
                    path: 'fencer',
                    model: 'User'
                }
            })
            .then(
                function(tournament) {
                    var fencers = tournament.fencers;
                    for(var i in fencers) {
                        var fencer = fencers[i];
                        if(fencer.fencer._id == userId) {
                            fencer.checkedIn = true;
                            fencers.set(i, fencer);
                            // console.log(fencers);
                            tournament.save();
                            return;
                        }
                    }
                    return Tournament.findById(tournamentId);
                },
                function(error) {
                    return null;
                }
            );
    }

    function updateTournament(tournamentId, tournament) {
        return Tournament.update(
            {_id: tournamentId},
            {$set :
            {
                name: tournament.name,
                description: tournament.description,
                location: tournament.location,
                fencers: tournament.fencers
            }
            }
        );
    }

    function deleteTournament(tournamentId) {
        return Tournament.remove({_id: tournamentId});
    }
};