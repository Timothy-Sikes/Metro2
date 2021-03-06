var http = require('http');
var requestify = require('requestify'); 

module.exports =
{
    getStops: function(callback, routeId) {
        return requestify.get('http://api.metro.net/agencies/lametro/routes/' + routeId + '/stops/').then(function(response) {
            callback(response);
        });
    },
    getStop: function(callback, stopId) {
        console.log("called getStop " + stopId);
        return requestify.get('http://api.metro.net/agencies/lametro/stops/' + stopId + '/info/').then(function(response) {
            console.log("original callback");
            callback(response);
        });
    },
    getPrediction: function(callback, route, departureId)
    {
        console.log("call get Prediction route " + route + " departure " + departureId);
        console.log('http://api.metro.net/agencies/lametro/routes/' + route + '/stops/' + departureId + '/predictions/');
        return requestify.get('http://api.metro.net/agencies/lametro/routes/' + route + '/stops/' + departureId + '/predictions/').then(function(response){
            console.log("original callback");
            callback(response);
        });
    },
    getTravelInfo: function() {
        console.log("called getTravelInfo");
        return { "message" : "The bus driver is tired today", 
                "duration" : "Your travel should take 30 minutes!"};
    }
};
