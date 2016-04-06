/**
 * FunController
 *
 * @description :: Server-side logic for managing funs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      //API will go here?
      var http = require('http');
      //trip.fun = null;

      //https://api.yelp.com/v2/search?term=cream+puffs&location=San+Francisco

      //Should return to the trip owner's show page
      res.redirect('/customer/show/' + trip.owner);
    });
  },

};

