
(function(){
    angular
        .module("WebAppMaker")
        .controller("TournamentEditController", TournamentEditController);

    function TournamentEditController($location, $scope, $rootScope, $routeParams, TournamentService, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.user = $rootScope.currentUser;

        vm.addFencer = addFencer;
        vm.search = search;
        vm.removeFencer = removeFencer;
        vm.updateTournament = updateTournament;
        vm.deleteTournament = deleteTournament;

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

        function search(name) {
            if (name === null) return;
            UserService.search(name)
                .then(
                    function(resp) {
                        vm.users = resp.data;
                        $scope.text =null;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }


        function addFencer(fencer) {
            if(fencer == null) return;
            for(var i in vm.fencers) {
                if(fencer.username == vm.fencers[i].fencer.username) {
                    vm.error = "Fencer already added!";
                    return;
                }
            }
            var newFencer = {
                fencer: fencer,
                checkedIn: false
            };
            // console.log(newFencer);
            vm.fencers.push(newFencer);
            console.log(vm.fencers);
            return;
        }

        function removeFencer(fencer) {
            // console.log(vm.fencers);
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

        function deleteTournament() {
            TournamentService
                .deleteTournament(vm.tournament._id)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/tournament");
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
    }
})();