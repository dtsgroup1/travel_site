/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */






module.exports = {

  'new': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      //API will go here?
      // var http = require('http');
      //trip.reservation = null;

      //http://api.hotwire.com/v1/search/hotel?apikey=abc123&dest=San%20Francisco,%20Ca.&rooms=1&adults=2&children=0&startdate=01/20/2014&enddate=01/23/2014


      var http = require('http');

      function process_response(webservice_response, hotel, callback) {
        var webservice_data = "";
        webservice_response.on('error', function(e) {
          console.log(e.message);
          callback("Error: " + e.message);
        });
        webservice_response.on('data', function(chunk) {
          webservice_data += chunk;
        });

        webservice_response.on('end', function() {
          hotel_data = JSON.parse(webservice_data);
          hotel.price = hotel_data.LastPrice;

          callback();
        });
      };

      function get_current_price(hotel, callback) {
        //http://dev.markitondemand.com/MODApis/Api/v2/Quote/JSON?symbol=AAPL
        //console.log(stock.symbol);
        options = {
          host: 'api.hotwire.com',
          port: 80,
          path: '/v1/deal/hotel' + trip.destination,
          method: 'GET'
        };

        // This is asynchronous - won't guarantee we get the response before we use it
        var webservice_request = http.request(options, function(response) {
          process_response(response, hotel, callback)
        });
        webservice_request.end();
      }

      async.each(customer.stocks, get_current_price, function(err){
        if(err) console.log(err);
        //console.log('done');

        res.view({
          hotel: hotel
        });
      });

    });
  },

/*  show: function (req, res, next) {
    Customer.findOne(req.param('id')).populateAll().exec(function (err, customer) {
      if (err) return next(err);
      if (!customer) return next();

      hotel.price = 0;
    }*/
};

// res.redirect('/trip/car/' + trip.id);
