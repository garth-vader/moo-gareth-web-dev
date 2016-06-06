
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, FlickrService, WidgetService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (resp) {
                    vm.widget = resp.data;
                });
        }
        init();

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response) {
                        var data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

        function selectPhoto(photo) {
            if(!vm.widget) {
                vm.error = "Problem with finding widget";
                return;
            }
            vm.widget.url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id +
                "_" + photo.secret + "_s.jpg";
            WidgetService.updateWidget(vm.widgetId, vm.widget)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }, function (error) {
                        vm.error = error.data;
                    });
        }
    }
})();