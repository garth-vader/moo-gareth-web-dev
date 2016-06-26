(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSort", wamSort);

    function wamSort() {
        function linker(scope, element, attributes) {
            var start = -1;
            var stop = -1;
            $(element)
                .find(".sortWidgets")
                .sortable({
                    axis: "y",
                    start: function (event, ui) {
                        start =  ui.item.index();
                    },
                    stop: function (event, ui) {
                        stop = ui.item.index();
                        scope.$parent.model.sortList(start, stop);
                    }
                });
        }
        return {
            templateUrl: "directives/wam-directives.html",
            scope: {
                title: "=",
                data: "=",
                reorder: "&sortList"
            },
            link: linker
        }
    }
})();