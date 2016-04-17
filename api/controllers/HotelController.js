/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



/*


module.exports = {

   'new': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next(); */

      //API will go here?
      // var http = require('http');
      //trip.reservation = null;

      //http://api.hotwire.com/v1/search/hotel?apikey=abc123&dest=San%20Francisco,%20Ca.&rooms=1&adults=2&children=0&startdate=01/20/2014&enddate=01/23/2014


      // Docs: http://app-framework-software.intel.com/api2/index.html#$_get
      // API Help Source: https://github.com/gomobile/sample-masheryhotwire/blob/master/www/js/api.js

      // var apiKey = 'qba8knkmf9ahgzbm6rmy988g';
      // var invalidKey = false;

      /*****************************************/



var Hotwire = require('hotwire');

                            //api key
var hotwire = new Hotwire('qba8knkmf9ahgzbm6rmy988g');
hotwire.hotelDeals({format: 'json', startdate: '04/28/2016', dest: 'Omaha', limit: '1'}, function (err, response, body) {
  if (err) {
    console.log(err);
  }
  console.log(response.statusCode);
  console.log(body);})


   /* function process_response(webservice_response, hotel, callback) {
    var webservice_data = "";
    webservice_response.on('error', function (e) {
      console.log(e.message);
      callback("Error: " + e.message);
    }),

      webservice_response.on('end', function () {
        hotel_data = JSON.parse(webservice_data);
        hotel.price = hotel_data.Price;

        callback();
      })


}; **/

