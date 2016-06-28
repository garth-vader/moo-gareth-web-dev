
(function(){
    angular
        .module("WebAppMaker")
        .controller("TournamentViewController", TournamentViewController);

    function TournamentViewController($rootScope, $routeParams, TournamentService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.user = $rootScope.currentUser;
        vm.checkIn = checkIn;

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
                            for(var i in vm.fencers) {
                                if(vm.fencers[i].fencer._id == vm.userId) {
                                    vm.checkedIn = vm.fencers[i].checkedIn;
                                }
                            }
                            // console.log(vm.fencers);
                        },
                        function(error) {
                            vm.error = "Tournament Not Found";
                        });
            }
        };
        init();

        function checkIn() {
            TournamentService
                .checkIn(vm.userId, vm.tid)
                .then(
                    function(resp) {
                        vm.checkedIn = resp.data;
                        init();
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

    }
})();