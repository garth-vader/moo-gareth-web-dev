module.exports = function(app, models) {

    var tournamentModel = models.tournamentModel;


    app.post("/api/user/:userId/tournament", createTournament);
    app.get("/api/user/:userId/tournament", findAllTournamentForUser);
    app.get("/api/tournament/:tournamentId", findTournamentById);
    //app.put("/api/website/:websiteId", updateWebsite);
    //app.delete("/api/website/:websiteId", deleteWebsite)

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
};