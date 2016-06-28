module.exports = function(app, models) {

    var tournamentModel = models.tournamentModel;


    app.post("/api/user/:userId/tournament", createTournament);
    app.get("/api/user/:userId/tournament", findAllTournamentForUser);
    app.get("/api/tournament/:tournamentId", findTournamentById);
    app.get("/api/tournament/fencer/:userId", findTournamentByFencer);
    app.put("/api/tournament/:tournamentId", updateTournament);
    app.delete("/api/tournament/:tournamentId", deleteTournament)

    function findAllTournamentForUser(req, res) {
        var id = req.params.userId;
        tournamentModel
            .findAllTournamentForUser(id)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    function findTournamentByFencer(req, res) {
        var id = req.params.userId;
        tournamentModel
            .findTournamentByFencer(id)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }
    function createTournament(req, res) {
        var newTournament = req.body;
        var creatorId = req.params["userId"];
        tournamentModel
            .createTournament(creatorId, newTournament)
            .then(
                function(resp) {
                    res.json(resp);
                },
                function(error) {
                    res.status(400).send("Unable to create tournament " + newTournament.name);
                }
            );
    }

    function findTournamentById(req, res) {
        var tournId = req.params["tournamentId"];
        tournamentModel
            .findTournamentById(tournId)
            .then(
                function(resp) {
                    res.json(resp);
                },
                function(error) {
                    res.status(400).send("Unable to find tournament ");
                }
            );
    }

    function updateTournament(req, res) {
        var id = req.params["tournamentId"];
        var newTournament = req.body;
        tournamentModel
            .updateTournament(id, newTournament)
            .then(
                function(resp) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send("Tournament with ID: "+ id +" not found");
                }
            );
    }

    function deleteTournament(req, res) {
        var id = req.params["tournamentId"];
        tournamentModel
            .deleteTournament(id)
            .then(
                function(resp) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send("Tournament with ID: "+ id +" not found");
                }
            );
    }
};