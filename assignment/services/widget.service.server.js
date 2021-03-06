/**
 * Created by gmoo on 6/5/16.
 */
module.exports = function(app, models) {
    var widgetModel = models.widgetModel;
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

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/page/:pageId/widget", reorderWidgets);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        for(var i in widgets) {
            if(widgets[i]._id == widgetId) {
                widgets[i].width = width;
                widgets[i].pageId = pageId;
                widgets[i].widgetType = "IMAGE";
                widgets[i].url = "/uploads/" + filename;
                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                return;
            }
        }
        res.sendStatus(404);

    }

    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;
        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.sendStatus(401);
                }
            );

        // newWidget._id = (new Date()).getTime() + "";
        // newWidget.pageId = pageId;
        // widgets.push(newWidget);
        // res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var id = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(id)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.status(400).send("Unable to find widgets");
                }
            );

        // var result = [];
        // for(var i in widgets) {
        //     if(widgets[i].pageId == id) {
        //         result.push(widgets[i]);
        //     }
        // }
        // res.send(result);
    }

    function findWidgetById(req, res) {
        var id = req.params.widgetId;
        widgetModel
            .findWidgetById(id)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.status(404).send("Widget "+id+" not found");
                }
            );
        // for(var i in widgets) {
        //     if(widgets[i]._id == id) {
        //         res.send(widgets[i]);
        //         return;
        //     }
        // }
        // res.status(404).send("Widget "+id+" not found");
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.status(404).send("Widget "+widgetId+" not found for update");
                }
            );
        // for(var i in widgets) {
        //     if(widgets[i]._id == widgetId) {
        //         widgets[i].widgetType = widget.widgetType;
        //
        //         if(widget.widgetType === "HEADER") {
        //             widgets[i].size = widget.size;
        //         }
        //         if(widget.widgetType === "HEADER" || widget.widgetType === "HTML") {
        //             widgets[i].text = widget.text;
        //         }
        //         if(widget.widgetType === "YOUTUBE" || widget.widgetType === "IMAGE") {
        //
        //             widgets[i].name = widget.name;
        //             widgets[i].text = widget.text;
        //             widgets[i].width = widget.width;
        //             widgets[i].url = widget.url;
        //         }
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Widget "+widgetId+" not found");

    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        
        widgetModel
            .deleteWidget(widgetId) 
            .then(
                function (widget) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(404).send("Widget "+widgetId+" not found for deletions");
                }
            );

        // for(var i in widgets) {
        //     if(widgets[i]._id === widgetId) {
        //         widgets.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Widget "+widgetId+" not found");
    }

    function reorderWidgets(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        var pageId = req.params.pageId;

        widgetModel
            .reorderWidgets(pageId, start, end)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.status(400).send("reorder failed");
                }
            );

    }
};