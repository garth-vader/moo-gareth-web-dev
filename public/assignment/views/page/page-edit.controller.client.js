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
            PageService
                .findPageById(vm.pageId)
                .then(
                    function(response) {
                        vm.page = response.data;
                    }
                );
        }
        init();

        function updatePage() {
            if (vm.page.name == null || vm.page.name == "") {
                vm.error = "Page Name is Empty";
                return false;
            }
            PageService
                .updatePage(vm.pageId, vm.page)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
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