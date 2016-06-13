module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cs4550summer1');
    
    var userModel = require("./users/user.model.server.js")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel;
    
    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    return models
}