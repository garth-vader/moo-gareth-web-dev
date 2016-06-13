/**
 * Created by gmoo on 6/5/16.
 */
module.exports = function(app, models) {

    var websiteModel = models.websiteModel;
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite)

    function createWebsite(req, res) {
        var newWebsite = req.body;
        var deleveloperId  = req.params["userId"];
        websiteModel
            .createWebsite(deleveloperId, newWebsite)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.status(400).send("Unable to create website " + newWebsite.name);
                }
            );
        // for(var i in websites) {
        //     if(websites[i].name === newWebsite.name &&
        //         websites[i].developerId === newWebsite.developerId) {
        //         res.status(400).send("Website " + newWebsite.name + " already exists");
        //         return;
        //     }
        // }
        // newWebsite._id = (new Date()).getTime() + "";
        // websites.push(newWebsite);
        // res.json(newWebsite);
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        websiteModel
            .deleteWebsite(id)
            .then(
                function(website) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove website with ID: " + id);
                }
            );
        // for(var i in websites) {
        //     if(websites[i]._id === id) {
        //         websites.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to remove website with ID: " + id);
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var website = req.body;
        websiteModel
            .updateWebsite(id, website)
            .then(
                function(website) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send("Website with ID: "+ id +" not found");
                }
            );
        // for(var i in websites) {
        //     if(websites[i]._id === id) {
        //         websites[i].name = website.name;
        //         websites[i].description = website.description;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.status(400).send("Website with ID: "+ id +" not found");
    }

    function findWebsiteById(req, res) {
        var id = req.params.websiteId;
        websiteModel
            .findWebsiteById(id)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.status(400).send("Unable to find website with id: "+id);
                }
            );

        // for(var i in websites) {
        //     if(id === websites[i]._id) {
        //         res.json(websites[i]);
        //         return;
        //     }
        // }
        // res.status(400).send("Unable to find website with id: "+id);
    }

    function findAllWebsitesForUser(req, res) {
        var id = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(id)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.send(result);
                }
            );

        // var result = [];
        // for(var i in websites) {
        //     if(websites[i].developerId === id) {
        //         result.push(websites[i]);
        //     }
        // }
        // return res.send(result);
    }
};