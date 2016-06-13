module.exports = function() {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);
    
    var api = {
        createWidget:createWidget,
        findAllWidgetsForPage:findAllWidgetsForPage,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidgets:reorderWidgets
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }
    
    function updateWidget(widgetId, widget) {
        return Widget.update(
            {_id: widgetId},
            {$set : widget}
        );
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function reorderWidgets(pageId, start, end) {
        start = parseInt(start);
        end = parseInt(end);
        return Widget
            .find({_page: pageid})
            .then(
                function (widgets) {
                    for(var i in widgets) {
                        var widget = widgets[i];

                        if(start < end) {
                            if(widget.order > start && widget.order <= end) {
                                widget.order --;
                                widget.save();
                            } else if(widget.order === start) {
                                widget.order = end;
                                widget.save();
                            }
                        } else if (start > end) {
                            if(widget.order >= end && widget.order < start) {
                                widget.order ++;
                                widget.save();
                            } else if(widget.order === start) {
                                widget.order = end;
                                widget.save();
                            }
                        }
                    }
                    return Widget.find({_page: pageId});
                },
                function (error) {
                    return null;
                }
            );
    }
};