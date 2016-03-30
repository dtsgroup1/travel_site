/**
 * TripController
 *
 * @description :: Server-side logic for managing trips
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'new': function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    Trip.create(req.params.all(), function tripCreated(err, trip) {
      if (err) return next(err);

      res.redirect('/trip/flight/' + trip.id);
    });
  },

  'flight': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      //API will go here?
      //Need to parse trip.departureDate for our API (/year/mo/da)
      var http = require('http');
      trip.fNum = null;

      //function pickFlight(date, date, fNum) {

      //}

      res.redirect('/trip/hotel/' + trip.id);
    });
  },

  'hotel': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      //API will go here?
      var http = require('http');
      trip.reservation = null;



      res.redirect('/trip/car/' + trip.id);
    });
  },

  'car': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      //API will go here?
      var http = require('http');
      trip.ride = null;



      res.redirect('/trip/fun/' + trip.id);
    });
  },

  'fun': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      //API will go here?
      var http = require('http');
      trip.ride = null;



      //Should return to the trip owner's show page
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
