(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;
        vm.userId = $routeParams["uid"];

        function createWebsite(name, description) {
            var website = {};
            if(name == "" || name == null) {
                vm.error = "No Website Name";
                return false;
            }
            website.developerId = vm.userId;
            website.name = name;
            website.description = description;
            WebsiteService
                .createWebsite(vm.userId, website)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }
    }
})();