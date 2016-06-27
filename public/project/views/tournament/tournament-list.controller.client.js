(function() {
    angular
        .module("WebAppMaker")
        .controller("TournamentListController", TournamentListController);

    function TournamentListController($location, $routeParams, $rootScope, TournamentService, UserService) {
        var vm = this;

        var userId = $rootScope.currentUser._id;

        function init() {
            UserService
                .findUserById(userId)
                .then(function (resp) {
                    vm.user = resp.data;
                });
            TournamentService
                .findTournamentByUser(userId)
                .then(
                    function(resp) {
                        vm.myTournaments = resp.data;
                    });
            // TournamentService
            //     .findTournaments()
            //     .then(
            //         function(resp) {
            //             vm.tournaments = resp.data;
            //         });
        }

        init();



    }

})();