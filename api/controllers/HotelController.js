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
      var http = require('http');
      //trip.reservation = null;

      //http://api.hotwire.com/v1/search/hotel?apikey=abc123&dest=San%20Francisco,%20Ca.&rooms=1&adults=2&children=0&startdate=01/20/2014&enddate=01/23/2014

      res.redirect('/trip/car/' + trip.id);
    });
  },

};

