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
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite() {
            if (vm.website.name == null || vm.website.name == "") {
                vm.error = "Website Name is Empty";
                return false;
            }
            if (WebsiteService.updateWebsite(vm.websiteId, vm.website)) {
                $location.url("/user/" + vm.userId + "/website");
                return true;
            } else {
                vm.error = "Unable to update website";
            }
            
        }

        function deleteWebsite() {
            if (WebsiteService.deleteWebsite(vm.websiteId)) {
                $location.url("/user/" + vm.userId + "/website");
                return true;
            } else {
                vm.error = "Unable to Delete Website";
            }
        }
    }
})();