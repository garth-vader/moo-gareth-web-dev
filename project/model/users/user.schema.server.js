module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        rating: {type: String, default: "U"},
        tournament: [mongoose.Schema.Types.ObjectId],
        dateCreate: {type: Date, default: Date.now()},
        facebook: {
            id:    String,
            token: String,
            displayName: String
        }
    }, {collection: "project.user"});
    return UserSchema
};