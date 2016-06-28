(function() {
    angular
        .module("WebAppMaker")
        .factory("TournamentService", TournamentService);

    function TournamentService($http) {
        var api = {
            createTournament: createTournament,
            findTournamentByUser: findTournamentByUser,
            findTournamentByFencer: findTournamentByFencer,
            findTournamentById: findTournamentById,
            updateTournament: updateTournament,
            deleteTournament: deleteTournament
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

        function findTournamentByFencer(userId) {
            var url = "/api/tournament/fencer/"+userId;
            return $http.get(url);
        }

        function findTournamentById(tournId) {
            var url = "/api/tournament/"+tournId;
            return $http.get(url);
        }

        function updateTournament(tournId, tournament) {
            var url = "/api/tournament/"+tournId;
            return $http.put(url, tournament);
        }

        function deleteTournament(tournId) {
            var url = "/api/tournament/" + tournId;
            return $http.delete(url);
        }



    }
})();

