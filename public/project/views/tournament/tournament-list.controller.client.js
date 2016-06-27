(function() {
    angular
        .module("WebAppMaker")
        .controller("TournamentListController", TournamentListController);

    function TournamentListController($location, $routeParams, $rootScope, TournamentService) {
        var vm = this;
        vm.myTournaments =[
            {name: "blah", location: "somwhere"},
            {name: "blash2", location: "awoefij"}
        ];
        var id = $rootScope.currentUser._id;

        function init() {
            // TournamentService
            //     .findTournamentsByUser(id)
            //     .then(
            //         function(resp) {
            //             vm.myTournaments = resp.data;
            //         });
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