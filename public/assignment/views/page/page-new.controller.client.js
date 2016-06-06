(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.createPage = createPage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
        }
        init();

        function createPage(name, title) {
            var page = {};
            if(name == "" || name == null) {
                vm.error = "No Page Name";
                return false;
            }
            page.name = name;
            page.title = title;
            page.websiteId = vm.websiteId;
            PageService
                .createPage(vm.websiteId, page)
                .then(
                    function(response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                },
                    function(error) {
                    vm.error = error.data;
            });
        }
    }
})();