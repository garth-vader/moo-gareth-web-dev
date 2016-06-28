
(function(){
    angular
        .module("WebAppMaker")
        .controller("TournamentNewController", TournamentNewController);

    function TournamentNewController($location, $scope, $rootScope, $routeParams, TournamentService, UserService) {
        var vm = this;
        vm.search = search;
        vm.createTournament = createTournament;
        vm.addFencer = addFencer;
        vm.removeFencer = removeFencer;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.user = $rootScope.currentUser;
            vm.fencers = [];
        }
        init();
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
    }
})();