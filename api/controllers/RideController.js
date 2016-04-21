/**
 * FlightController
 *
 * @description :: Server-side logic for managing flights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res) {
    Trip.findOne(req.param('owner'), function foundTrip(err, trip) {
      if (err) return next(err);
      if (!trip) return next();
      res.view({
        trip: trip
      });
    });
  },

  create: function (req, res, next) {
    Ride.create(req.params.all(), function rideCreated(err,ride) {
      if (err) return next(err);

      console.log('ride:',ride.owner);

      res.redirect('/trip/show/' + ride.owner);
    });
  },

  'search': function (req, res, next) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      var ride_data;
      var https = require('https');
      //appID: 0efb0de0
      //appKey: 4cc49ed437eb48a4729722360e30ac41

      //parse trip date

      //flight by route, departing on given date
      //curl -v  -X GET "https://api.flightstats.com/flex/schedules/rest/v1/json/from/OMA/to/DFW/departing/2016/04/09?appId=0efb0de0&appKey=4cc49ed437eb48a4729722360e30ac41"

      function process_response(webservice_response, trip, callback) {
        console.log('running process_response');
        var webservice_data = "";
        webservice_response.on('error', function (e) {
          console.log(e.message);
          callback('Error: ' + e.message);
        });
        webservice_response.on('data', function (chunk) {
          webservice_data += chunk;
        });

        webservice_response.on('end', function () {
          ride_data = JSON.parse(webservice_data);
          callback();
        });
      }

      function pick_ride(trip, callback) {
//        console.log('ride cost est');

        // api token/key: kuhOpgaA1JkBbjFyJ7iaweUbCUVYZOrPlMFdMl8H
        // curl -H 'Authorization: kuhOpgaA1JkBbjFyJ7iaweUbCUVYZOrPlMFdMl8H'

        // &start_latitude=37.623908;
        // &startLongitude=-122.381592;
        // &endLatitude=-37.623908;
        // &startLongitude=-122.401213,

        options = {
          host: 'api.uber.com',
          path: '/v1/estimates/price?server_token=kuhOpgaA1JkBbjFyJ7iaweUbCUVYZOrPlMFdMl8H&start_latitude=39.7410194&start_longitude=-104.9835917&end_latitude=39.7414517&end_longitude=-104.9811135',
          method: 'GET'
        };

        // This is asynchronous - won't guarantee we get the response before we use it
        var webservice_request = https.request(options, function (webservice_response) {
          process_response(webservice_response, trip, callback)
        });
        webservice_request.end();
      }

      //cycler array is used to tell async to cycle through array of 1 value; the current trip, that is
      var cycler = [trip];
      async.each(cycler, pick_ride, function (err) {
        if (err) console.log(err);
        console.log('async is done');

        //test API. prints out first flight object
        //console.log('fData2:',flight_data.scheduledFlights[0]);

        console.log(ride_data.prices[0]);

        res.view({
          trip: trip,
          rides: ride_data
        });
      });

    });
  }

};
