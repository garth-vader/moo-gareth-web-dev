/**
 * Created by gmoo on 6/5/16.
 */
module.exports = function(app, models) {
    var pageModel = models.pageModel;
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage (req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        return pageModel
            .createPage(websiteId, newPage)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.status(400).send("Page with name "+newPage.name+" already exists");
                }
            );
        // for (var i in pages) {
        //     if (pages[i].name === newPage.name &&
        //         pages[i].websiteId === newPage.websiteId) {
        //         res.status(400).send("Page with name "+newPage.name+" already exists");
        //         return;
        //     }
        // }
        // newPage._id = (new Date()).getTime() + "";
        // pages.push(newPage);
        // res.json(newPage);
    }

    function findAllPagesForWebsite(req, res) {
        var id = req.params.websiteId;
        return pageModel
            .findAllPagesForWebsite(id)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
        // var result = [];
        // for(var i in pages) {
        //     if(pages[i].websiteId === id) {
        //         result.push(pages[i]);
        //     }
        // }
        // res.send(result);
    }

    function findPageById(req, res) {
        var id = req.params.pageId;
        return pageModel
            .findPageById(id)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(400);
                }

            );
        // for(var i in pages) {
        //     if(pages[i]._id === id) {
        //         res.send(pages[i]);
        //     }
        // }

    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;
        return pageModel
            .updatePage(id, newPage)
            .then(
                function (page) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(404).send("page with "+id+" not found");
                }
            );
        // for(var i in pages) {
        //     if(pages[i]._id === id) {
        //         pages[i].name = newPage.name;
        //         pages[i].title = newPage.title;
        //         res.sendStatus(200);
        //     }
        // }
        // res.status(404).send("page with "+id+" not found")
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        return pageModel
            .deletePage(id)
            .then(
                function (page) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(404).send("page with "+id+" not found")
                }
            );
        // for(var i in pages) {
        //     if(pages[i]._id === id) {
        //         pages.splice(i, 1);
        //         res.sendStatus(200);
        //     }
        // }
        // res.status(404).send("page with "+id+" not found")
    }
    
}