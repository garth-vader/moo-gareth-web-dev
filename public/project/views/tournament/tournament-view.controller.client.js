
(function(){
    angular
        .module("WebAppMaker")
        .controller("TournamentViewController", TournamentViewController);

    function TournamentViewController($rootScope, $routeParams, TournamentService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.user = $rootScope.currentUser;

        function init() {
            vm.tid = $routeParams["tid"];
            if (vm.tid == null) {
                vm.fencers = [];
                vm.error = "Tournament Not Found";
            } else {
                TournamentService.findTournamentById(vm.tid)
                    .then(
                        function(resp) {
                            vm.tournament = resp.data;
                            vm.fencers = vm.tournament.fencers;
                            console.log(vm.fencers);
                        },
                        function(error) {
                            vm.error = "Tournament Not Found";
                        });
            }
        };
        init();

    }
})();