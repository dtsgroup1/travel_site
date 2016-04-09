/**
 * FlightController
 *
 * @description :: Server-side logic for managing flights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'search': function(){},

  'new': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      var http = require('http');
      trip.year = null;
      trip.month = null;
      trip.day = null;
      //appID: 0efb0de0
      //appKey: 4cc49ed437eb48a4729722360e30ac41

      //parse trip date
      date_array = trip.departureDate.split("/");

      //flight by route, departing on given date
      //curl -v  -X GET "https://api.flightstats.com/flex/schedules/rest/v1/json/from/OMA/to/DFW/departing/2016/04/09?appId=0efb0de0&appKey=4cc49ed437eb48a4729722360e30ac41"

      function pick_flight(trip, callback) {
       //Need to parse trip.departureDate for our API (/trip.year/trip.month/trip.day)
       options = {
       host: 'api.flightstats.com',
       port: 80,
       path: '/flex/flightstatus/rest/v2/json/route/status/'+trip.origin+'/'+trip.destination+'/dep/'+date_array[3]+'/'+date_array[2]+'/'+date_array[1],
       method: 'GET'
       };

    });
  },

};

