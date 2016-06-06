(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.flickrNavigation = flickrNavigation;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        function init() {

            WidgetService.findWidgetById(vm.widgetId)
                .then(
                    function(response) {
                        vm.widget = response.data;
                    },
                    function(error) {
                        console.log(error.data);
                    }
                );
        }
        init();

        function updateWidget() {
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    },
                    function(error){
                        vm.error = error.data;
                    });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }

        function flickrNavigation() {
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId +
                        "/widget/" + vm.widgetId + "/flickr");
                }, function (error) {
                    vm.error = error.data;
                });
        }
    }
})();