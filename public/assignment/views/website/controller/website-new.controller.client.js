(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;

        function init() {
            vm.userId = $routeParams["uid"];
        }
        init();

        function createWebsite(name, description) {
            var website = {};
            if(name == "" || name == null) {
                vm.error = "No Website Name";
                return false;
            }
            
            website._id = (new Date()).getTime().toString();
            website.name = name;
            website.description = description;
            if(WebsiteService.createWebsite(vm.userId, website)) {
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Problems Creating Website";
                return false;
            }
        }
    }
})();