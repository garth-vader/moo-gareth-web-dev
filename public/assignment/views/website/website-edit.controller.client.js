(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            console.log(vm.pageId);
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(
                    function(response) {
                        vm.website = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
        init();

        function updateWebsite() {
            if (vm.website.name == null || vm.website.name == "") {
                vm.error = "Website Name is Empty";
                return;
            }

            WebsiteService
                .updateWebsite(vm.websiteId, vm.website)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website");
                    },
                    function(error) {
                        vm.error = "Unable to update website";
                    }
                );
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website");
                    },
                    function(error) {
                        vm.error = error.data;
            });
        }
    }
})();