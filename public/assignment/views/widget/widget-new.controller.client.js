
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            var newWidget = {
                widgetType: widgetType
            };

            WidgetService
                .createWidget(vm.pageId, newWidget)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId +
                            "/widget/" + newWidget._id);
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
    }
})();