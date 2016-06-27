
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewTournamentController", NewTournamentController);

    function NewTournamentController($location, $routeParams, TournamentService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.fencers = [];
        vm.createTournament = createTournament;
        vm.addFencer = addFencer;
        //vm.updateFencer = updateFencer;
        vm.removeFencer = removeFencer;

        function createTournament(name, description) {
            var newTournament = {};
            if(name == "" || name == null) {
                vm.error = "No Tournament Name";
                return false;
            }
            newTournament.name = name;
            newTournament.description = description;
            newTournament.fencerCheckIn = vm.fencers;
            TournamentService
                .createTournament(vm.userId, newTournament)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/Tournament");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

        function addFencer(fencer) {
            if(fencer == null) return;
            var newFencer = {
                fencerName: fencer.name,
                checkedIn: false
            };
            vm.fencers.push(newFencer);
            console.log(vm.fencers);
        }

        function removeFencer(fencer) {
            console.log(vm.fencers);
            var index = vm.fencers.indexOf(fencer);
            vm.fencers.splice(index,1);
        }
    }
})();