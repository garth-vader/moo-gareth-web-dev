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

            page._id = (new Date()).getTime().toString();
            page.name = name;
            page.title = title;
            if(PageService.createPage(vm.websiteId, page)) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Problems Creating Website";
                return false;
            }
        }
    }
})();