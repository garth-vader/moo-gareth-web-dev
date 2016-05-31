(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets =
            [
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            if(!findWidgetById(widget._id)) {
                widget.pageId = pageId;
                widgets.push(widget);
                return true;
            }
            return false;
        }


        function findWidgetsByPageId(pageId) {
            var widgetsForPage = [];
            for(var i in widgets) {
                if(widgets[i].pageId == pageId) {
                    widgetsForPage.push(widgets[i]);
                }
            }
            return widgetsForPage;
        }

        function findWidgetById(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id == widgetId) {
                    return widgets[i];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var i in widgets) {
                if(widgets[i]._id == widgetId) {
                    widgets[i].widgetType = widget.widgetType;
                    widgets[i].pageId = widget.pageId;
                    
                    if(widget.widgetType === "HEADER") {
                        widgets[i].size = widget.size;
                    }
                    if(widget.widgetType === "HEADER" || widget.widgetType === "HTML") {
                        widgets[i].text = widget.text;
                    }
                    if(widget.widgetType === "YOUTUBE" || widget.widgetType === "IMAGE") {
                        widgets[i].width = widget.width;
                        widgets[i].url = widget.url;
                    }
                    return true;
                }
            }
            return false;
        }


        function deleteWidget(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();