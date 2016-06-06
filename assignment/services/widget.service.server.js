/**
 * Created by gmoo on 6/5/16.
 */
module.exports = function(app) {
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

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res) {
        var newWidget = req.body;
        for (var i in widgets) {
            if (widgets[i].pageId === newWidget.pageId &&
                widgets[i].widgetType === newWidget.widgetType &&
                widgets[i].size === newWidget.size &&
                widgets[i].text === newWidget.text &&
                widgets[i].url === newWidget.url &&
                widgets[i].width === newWidget.width) {
                    res.status(400).send("Widget with name "+newWidget.name+" already exists");
                    return;
            }
        }
        newWidget._id = (new Date()).getTime() + "";
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var id = req.params.pageId;
        var result = [];
        for(var i in widgets) {
            if(widgets[i].pageId == id) {
                result.push(widgets[i]);
            }
        }
        res.send(result);
    }

    function findWidgetById(req, res) {
        var id = req.params.widgetId;
        for(var i in widgets) {
            if(widgets[i]._id == id) {
                res.send(widgets[i]);
                return;
            }
        }
        res.status(404).send("Widget "+id+" not found");
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
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
                res.sendStatus(200);
            }
        }
        res.status(404).send("Widget "+widgetId+" not found");

    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Widget "+widgetId+" not found");
    }
}