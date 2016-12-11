var http = require('http');
var requestify = require('requestify'); 

module.exports =
{
    /*getStops: function() {
        return requestify.get('http://api.metro.net/agencies/lametro/routes/704/stops/').then(function(response) {
        // Get the response body
        console.log("We got the thing");
        console.log(response.getBody());
        response.GetBody();
    }, function(response)
    {
        console.log("Error-ed");
        console.log(response);
    });
    },*/
    getStops2: function(callback) {
        return requestify.get('http://api.metro.net/agencies/lametro/routes/704/stops/').then(function(response) {
            callback(response);
        });
    },
};

function getStops()
{
    return requestify.get('http://api.metro.net/agencies/lametro/routes/704/stops/').then(function(response) {
        // Get the response body
        response.getBody();
    });
}
