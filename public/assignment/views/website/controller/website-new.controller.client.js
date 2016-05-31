(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;

        function init() {
            vm.uid = $routeParams["iud"];
        }
        init();

        function createWebsite() {
            WebsiteService.createWebsite()
        }
    }
})();