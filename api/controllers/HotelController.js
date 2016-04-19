/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

<<<<<<< Updated upstream
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

  'search': function (req, res, next) {
    //how do we find the flight we need?
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();
=======


/**


 module.exports = {

 'new': function(req, res) {
 Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
 if (err) return next(err);
 if (!trip) return next(); */

//API will go here?
// var http = require('http');
//trip.reservation = null;

//http://api.hotwire.com/v1/search/hotel?apikey=abc123&dest=San%20Francisco,%20Ca.&rooms=1&adults=2&children=0&startdate=01/20/2014&enddate=01/23/2014
>>>>>>> Stashed changes

      //http://api.hotwire.com/v1/search/hotel?apikey=qba8knkmf9ahgzbm6rmy988g&dest=San%20Francisco,%20Ca.&rooms=1&adults=2&children=0&startdate=04/20/2016&enddate=04/23/2016
      //var invalidKey = false;
      //appKey: qba8knkmf9ahgzbm6rmy988g

// Docs: http://app-framework-software.intel.com/api2/index.html#$_get
// API Help Source: https://github.com/gomobile/sample-masheryhotwire/blob/master/www/js/api.js

<<<<<<< Updated upstream
      var Hotwire = require('hotwire');
      var http = require('http');
      trip.year = null;
      trip.month = null;
      trip.day = null;
      //api key
      var hotwire = new Hotwire('qba8knkmf9ahgzbm6rmy988g');

      //bring arrival over from flight.  Get dest from trip or flight?
      //parse trip date
      var date_array = flight.arrival.split("/");
      var endDate_array = trip.returnDate.split("/");

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
          hotel_data = JSON.parse(webservice_data);
          callback();
        });
      }

      /*      hotwire.hotelDeals({
       format: 'json',
       startdate: '04/28/2016',
       dest: 'Omaha',
       limit: '1'
       }, function (err, response, body) {
       if (err) {
       console.log(err);
       }
       console.log(response.statusCode);
       console.log(body);
       });
       */
      function pick_hotel(trip, callback) {
//        console.log('running pick_hotel');
        options = {
          host: 'api.hotwire.com',
          path: '/v1/search/hotel?apikey=qba8knkmf9ahgzbm6rmy988g&dest='+ trip.destination +'&rooms=1&adults=2&children=0&startdate='+ date_array[0] +'/'+ date_array[1] +'/'+ date_array[2] +'&enddate='+ endDate_array[0] +'/'+ endDate_array[1] +'/'+ endDate_array[2],
          method: 'GET'
        };

        // This is asynchronous - won't guarantee we get the response before we use it
        var webservice_request = http.request(options, function (webservice_response) {
          process_response(webservice_response, trip, callback)
        });
        webservice_request.end();
      }

      //What array do we need for the first argument here???
      var cycler = [trip]
      async.each(cycler, pick_hotel, function (err) {
        if (err) console.log(err);
        console.log('async is done');

        res.view({
          trip: trip,
          hotel: hotel_data
        });
      });

    });
  }

};
=======
// var apiKey = 'qba8knkmf9ahgzbm6rmy988g';
// var invalidKey = false;

/*****************************************/

module.exports = {



  show: function (req, res, next) {

    var Hotwire = require('hotwire');

//api key
    var hotwire = new Hotwire('qba8knkmf9ahgzbm6rmy988g');
    hotwire.hotelDeals({
      format: 'json',
      startdate: '04/28/2016',
      dest: 'Omaha',
      limit: '5'
    }, function (err, response, body) {
      if (err) {
        console.log(err);
      }
      console.log(response.statusCode);
      console.log(JSON.parse(body).Result);
      var hotels = JSON.parse(body).Result;
      

      async.each([hotels], function (err) {
        if (err) console.log(err);
        //console.log('done');

        res.view({
          hotels: hotels
        })

      })

    })

  }

}



      /**

       function process_response(webservice_response, hotel, callback) {
       var webservice_data = "";
       webservice_response.on('error', function (e) {
       console.log(e.message);
       callback("Error: " + e.message);
       });
       webservice_response.on('data', function (chunk) {
       webservice_data += chunk;
       });

       webservice_response.on('end', function () {
       hotel_data = JSON.parse(webservice_data);
       hotel.price = hotel.Price;
       var sumprice = 0;
       var avgprice = 0;
       sumPrice += hotel.Price;
       avgPrice = (sumPrice / 5);


       // console.log(stock.symbol + ' = $' + stock.current_price);
       callback();
       });


        });
    });
    });
  }
}
**/
>>>>>>> Stashed changes


