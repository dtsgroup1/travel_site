/**
 * FlightController
 *
 * @description :: Server-side logic for managing flights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res) {
    Trip.findOne(req.param('owner'), function foundTrip(err, customer) {
      if (err) return next(err);
      if (!customer) return next();
      res.view({
        trip: trip
      });
    });
  },

  create: function (req, res, next) {
    Flight.create(req.params.all(), function stockCreated(err, flight) {
      if (err) return next(err);

      res.redirect('/trip/show/' + flight.owner);
    });
  },

  'search': function (req, res, next) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      var flight_data;
      var https = require('https');
      trip.year = null;
      trip.month = null;
      trip.day = null;
      //appID: 0efb0de0
      //appKey: 4cc49ed437eb48a4729722360e30ac41

      //parse trip date
      date_array = trip.departureDate.split("/");

      //flight by route, departing on given date
      //curl -v  -X GET "https://api.flightstats.com/flex/schedules/rest/v1/json/from/OMA/to/DFW/departing/2016/04/09?appId=0efb0de0&appKey=4cc49ed437eb48a4729722360e30ac41"

      function process_response(webservice_response, trip, callback) {
        var webservice_data = "";
        webservice_response.on('error', function (e) {
          console.log(e.message, 'im heeer');
          callback('Error: ' + e.message);
        });
        webservice_response.on('data', function (chunk) {
          console.log(e.message, '52');
          webservice_data += chunk;
        });

        webservice_response.on('end', function () {
          flight_data = JSON.parse(webservice_data);
          callback();
        });
      };

      function pick_flight(trip, callback) {
        options = {
          host: 'api.flightstats.com',
          path: '/flex/schedules/rest/v1/json/from/' + trip.origin + '/to/' + trip.destination + '/departing/' + date_array[2] + '/' + date_array[0] + '/' + date_array[1]+'?appId=0efb0de0&appKey=4cc49ed437eb48a4729722360e30ac41',
          method: 'GET'
        };
        console.log(options);

        var webservice_request = https.request(options, function (webservice_response) {
          var webservice_data = "";
          console.log(webservice_response.statusCode);

          webservice_response.on('data', function (chunk) {
            webservice_data += chunk;
          });

          webservice_response.on('end', function () {
            var flight_data = JSON.parse(webservice_data);
            callback();
          });
        });

        webservice_request.on('error', function (e) {
          console.log(e.message, 'im heeer');
          callback('Error: ' + e.message);
        });

        webservice_request.end();
      };

 /*     async.each(trip.flights, pick_flight, function (err) {
        if (err) console.log(err);
        console.log('done');
      });
*/

      pick_flight(trip, function (err) {
      });

      console.log(flight_data);
      res.view({
        flight: flight_data,
        trip: trip
      });
    });
  },
};

