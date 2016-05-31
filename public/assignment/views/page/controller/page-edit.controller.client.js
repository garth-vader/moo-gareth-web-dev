(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage() {
            if (vm.page.name == null || vm.page.name == "") {
                vm.error = "Page Name is Empty";
                return false;
            }
            if (PageService.updatePage(vm.pageId, vm.page)) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                return true;
            } else {
                vm.error = "Unable to update page";
                return false;
            }

        }

        function deletePage() {
            if (PageService.deletePage(vm.pageId)) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                return true;
            } else {
                vm.error = "Unable to Delete page";
                return false;
            }
        }
    }
})();