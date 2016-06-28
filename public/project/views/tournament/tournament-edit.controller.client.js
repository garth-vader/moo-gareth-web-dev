
(function(){
    angular
        .module("WebAppMaker")
        .controller("TournamentEditController", TournamentEditController);

    function TournamentEditController($location, $scope, $rootScope, $routeParams, TournamentService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.user = $rootScope.currentUser;

        vm.addFencer = addFencer;
        //vm.updateFencer = updateFencer;
        vm.removeFencer = removeFencer;

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
            console.log(vm.fencers);
            var index = vm.fencers.indexOf(fencer);
            vm.fencers.splice(index,1);
        }
    }
})();