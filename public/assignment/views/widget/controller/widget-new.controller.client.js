
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
                _id: (new Date()).getTime().toString(),
                widgetType: widgetType
            };
            if(WidgetService.createWidget(vm.pageId, newWidget)) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId +
                    "/widget/" + newWidget._id);
            } else {
                vm.error = "Unable to Create widget";
                return false;
            }
        }
    }
})();