
(function(){
    angular
        .module("WebAppMaker")
        .controller("TournamentEditController", TournamentEditController);

    function TournamentEditController($scope, $rootScope, $routeParams, TournamentService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.user = $rootScope.currentUser;

        vm.addFencer = addFencer;
        //vm.updateFencer = updateFencer;
        vm.removeFencer = removeFencer;
        vm.updateTournament = updateTournament;

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

        function addFencer(fencer) {
            if(fencer == null) return;
            for(var i in vm.fencers) {
                if(fencer.name == vm.fencers[i].name) {
                    vm.error = "Fencer already added!";
                    return;
                }
            }
            var newFencer = {
                name: fencer.name,
                checkedIn: false
            };
            $scope.fencer = null;
            vm.fencers.push(newFencer);
        }

        function removeFencer(fencer) {
            var index = vm.fencers.indexOf(fencer);
            vm.fencers.splice(index,1);
        }

        function updateTournament() {
            var tournament = vm.tournament;
            if(tournament.name == null || tournament === "") vm.error("Tournament Name is Empty");
            TournamentService
                .updateTournament(vm.tid, tournament)
                .then(
                    function(res) {
                        init();
                        vm.success = "Tournament successfully updated";
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }
    }
})();