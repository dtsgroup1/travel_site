/**
 * FlightController
 *
 * @description :: Server-side logic for managing flights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      var http = require('http');
      //appID: 0efb0de0
      //appKey: 4cc49ed437eb48a4729722360e30ac41

      //flight by route, departing on given date
      //curl -v  -X GET "https://api.flightstats.com/flex/schedules/rest/v1/json/from/OMA/to/LAX/departing/2016/04/06?appId=0efb0de0&appKey=4cc49ed437eb48a4729722360e30ac41"

      /*function pick_flight(trip, callback) {
       //Need to parse trip.departureDate for our API (/trip.year/trip.month/trip.day)
       options = {
       host: 'api.flightstats.com',
       port: 80,
       path: '/flex/flightstatus/rest/v2/json/route/status/'+trip.origin+'/'+trip.destination+'/dep/'+trip.year+'/'+trip.month+'/'+trip.day,
       method: 'GET'
       };

       get flightNum from callback*/

      res.redirect('/trip/hotel/' + trip.id);
    });
  },

};

