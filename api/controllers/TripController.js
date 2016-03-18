/**
 * TripController
 *
 * @description :: Server-side logic for managing trips
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'new': function(req, res, next) {
    Customer.findOne(req.param('owner'), function foundCustomer (err, customer) {
      if (err) return next(err);
      if (!customer) return next();

      res.view({
        customer: customer
      });
    });
  },

  create: function(req, res, next) {
    Trip.create(req.params.all(), function tripCreated(err, trip) {
      if (err) return next(err);

      //this should show the one customer..
      res.redirect('/customer/show/' + trip.owner);
    });
  },

  show: function (req, res, next) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      res.view({
        trip: trip
      });
    });
  },

  edit: function(req, res, next) {
    Trip.findOne(req.param('id'), function foundTrip(err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      res.view({
        trip: trip
      });
    });
  },

  update: function(req, res, next) {
    Trip.update(req.param('id'), req.params.all(), function tripUpdated(err){
      if (err) {
        return res.redirect('/trip/edit/' + req.param('id'));
      }

      res.redirect('/customer/');
    });
  },

  destroy: function(req, res, next) {
    Trip.destroy(req.param('id')).populateAll().exec( function (err, trip) {
      if (err) return next(err);

      //this should show the one customer..
      res.redirect('/customer/');
    });
  }
};
