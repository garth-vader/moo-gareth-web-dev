(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;


        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function(response) {
                        vm.widgets = response.data;
                    }
                );
        }
        init();
        
        $(".widget-container")
        // .draggable()
            .sortable({axis: "y"});


        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }


        function getTrustedUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
        
        function sortList(start, stop) {
            WidgetService
                .reorderWidgets(vm.pageId, start, stop)
                .then(
                    function(res) {
                        vm.widgets = res.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }


    }
})();