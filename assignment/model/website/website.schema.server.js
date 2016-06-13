module.exports = function () {
    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        description: String,
        pages: [mongoose.Schema.Types.ObjectId],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "assignment.website"});
    return WebsiteSchema;
};