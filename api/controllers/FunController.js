/**
 * FunController
 *
 * @description :: Server-side logic for managing funs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res, next) {
    Hotel.create(req.params.all(), function stockCreated(err, hotel) {
      if (err) return next(err);

      console.log('deal:',hotel.deal);

      res.redirect('/trip/show/' + hotel.owner);
    });
  },

  search: function (req, res, next) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {

      var fun_data;
      var https = require('https');

      //key: 5PJ-MNJ156q_ztrAeSiDR467V7nuHnUr
      //URI: https://api.yelp.com/v2/search?term=german+food&location=Hayes&cll=37.77493,-122.419415

      //get lat/long from hotel
      var lat = trip.hotels[trip.hotels.length-1].price;
      var long = trip.hotels[trip.hotels.length-1].refNum;

      function process_response(webservice_response, trip, callback) {
//        console.log('running process_response');
        var webservice_data = "";
        webservice_response.on('error', function (e) {
          console.log(e.message);
          callback('Error: ' + e.message);
        });
        webservice_response.on('data', function (chunk) {
          webservice_data += chunk;
        });

        webservice_response.on('end', function () {
          flight_data = JSON.parse(webservice_data);
          callback();
        });
      }

      function pick_flight(trip, callback) {
//        console.log('running pick_flight');
        options = {
          host: 'api.flightstats.com',
          path: '/flex/schedules/rest/v1/json/from/' + trip.origin + '/to/' + trip.destination + '/departing/' + date_array[0] + '/' + date_array[1] + '/' + date_array[2] + '?appId=0efb0de0&appKey=4cc49ed437eb48a4729722360e30ac41',
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
      async.each(cycler, pick_flight, function (err) {
        if (err) console.log(err);
        console.log('async is done');

        //test API. prints out first flight object
        //console.log('fData2:',flight_data.scheduledFlights[0]);

        res.view({
          trip: trip,
          flight: flight_data
        });
      });

    });
  }

};
