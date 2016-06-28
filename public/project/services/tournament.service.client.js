(function() {
    angular
        .module("WebAppMaker")
        .factory("TournamentService", TournamentService);

    function TournamentService($http) {
        var api = {
            createTournament: createTournament,
            findTournamentByUser: findTournamentByUser,
            findTournamentById: findTournamentById,
            //updateTournament: updateTournament,
            //deleteTournament: deleteTournament
        };
        return api;

        function createTournament(userId,tourn) {
            var url = "/api/user/"+userId+"/tournament";
            return $http.post(url,tourn);
        }

        function findTournamentByUser(userId) {
            var url = "/api/user/"+userId+"/tournament";
            return $http.get(url);
        }

        function findTournamentById(tournId) {
            var url = "/api/tournament/"+tournId;
            return $http.get(url);
        }





    }
})();

