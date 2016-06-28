
(function(){
    angular
        .module("WebAppMaker")
        .controller("TournamentNewController", TournamentNewController);

    function TournamentNewController($location, $scope, $rootScope, $routeParams, TournamentService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.user = $rootScope.currentUser;
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
            newTournament.fencers = vm.fencers;
            TournamentService
                .createTournament(vm.userId, newTournament)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/tournament");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

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
            console.log(vm.fencers);
            var index = vm.fencers.indexOf(fencer);
            vm.fencers.splice(index,1);
        }
    }
})();