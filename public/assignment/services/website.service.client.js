(function(){
    angular.module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService($http) {

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            if(!findWebsiteById(website._id)) {
                website.developerId = userId;
                websites.push(website);
                return true;
            }
            return false;
        }

        function findWebsiteById(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    return angular.copy(websites[i]);
                }
            }
            return null;
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    websites[i].name = website.name;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;

        }
    }
})();