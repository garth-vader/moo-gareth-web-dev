module.exports = function() {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
        type: {type: String,
            enum: ["HEADER", "IMAGE", "YOUTUBE", "HTML", "INPUT", "TEXT"]},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        order: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreate: {type: Date, default: Date.now()}
    }, {collection: "assignment.widget"});
    return WidgetSchema;
};