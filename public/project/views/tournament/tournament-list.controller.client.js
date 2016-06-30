(function() {
    angular
        .module("WebAppMaker")
        .controller("TournamentListController", TournamentListController);

    function TournamentListController($rootScope, TournamentService, UserService) {
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
            TournamentService
                .findTournamentByFencer(userId)
                .then(
                    function(resp) {
                        vm.regTournaments = resp.data;
                        // console.log(vm.regTournaments);
                    });
        }

        init();



    }

})();