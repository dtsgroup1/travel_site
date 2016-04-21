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
    Ride.create(req.params.all(), function rideCreated(err, ride) {
      if (err) return next(err);

      console.log('ride:', ride.owner);

      res.redirect('/trip/show/' + ride.owner);
    });
  },

  'search': function (req, res, next) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      var ride_data;
      var https = require('https');

      //get lat/long from hotel
      var lat = trip.hotels[trip.hotels.length-1].price;
      var long = trip.hotels[trip.hotels.length-1].refNum;
      //calculate a 2-block trip
      var endLat = trip.hotels[trip.hotels.length-1].price-.02;
      var endLong = trip.hotels[trip.hotels.length-1].refNum-.02;

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
          path: '/v1/estimates/price?server_token=kuhOpgaA1JkBbjFyJ7iaweUbCUVYZOrPlMFdMl8H&start_latitude='+lat+'&start_longitude='+long+'&end_latitude='+endLat+'&end_longitude='+endLong,
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
//        console.log('async is done');

        console.log(ride_data.prices[0]);

        res.view({
          trip: trip,
          rides: ride_data
        });
      });

    });
  }

};
