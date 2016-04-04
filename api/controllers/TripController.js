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

      var http = require('http');
      //Authorization = appID:
      //Authorization = appKey:
      //trip.fNum = null;

      //https://api.flightstats.com/flex/flightstatus/rest/v2/json/route/status/PDX/HNL/dep/2016/04/03

      /*function pick_flight(trip, callback) {
        //Need to parse trip.departureDate for our API (/trip.year/trip.month/trip.day)
        options = {
          host: 'api.flightstats.com',
          port: 80,
          path: '/flex/flightstatus/rest/v2/json/route/status/'+trip.origin+'/'+trip.destination+'/dep/'+trip.year+'/'+trip.month+'/'+trip.day,
          method: 'GET'
        };

      get flightNum from callback*/

      res.redirect('/trip/hotel/' + trip.id);
    });
  },

  'hotel': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      //API will go here?
      var http = require('http');
      //trip.reservation = null;



      res.redirect('/trip/car/' + trip.id);
    });
  },

  'car': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      //API will go here?
      var http = require('http');
      //trip.ride = null;



      res.redirect('/trip/fun/' + trip.id);
    });
  },

  'fun': function(req, res) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      //API will go here?
      var http = require('http');
      //trip.fun = null;



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
