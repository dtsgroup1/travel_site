/**
 * RideController
 *
 * @description :: Server-side logic for managing rides
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      //API will go here?
      var http = require('http');
      //trip.ride = null;



      res.redirect('/trip/fun/' + trip.id);
    });
  },

};

