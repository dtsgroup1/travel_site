/**
 * TripController
 *
 * @description :: Server-side logic for managing trips
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'new': function (req, res, next) {

    //api logic goes here, yes?
    //http://iatacodes.org/api/v5/routes?departure=OMA&api_key=b871ce6f-b667-4ac8-b1c5-2b5a4e6840a4

    var port_data;
    var http = require('http');
    //APIKey: b871ce6f-b667-4ac8-b1c5-2b5a4e6840a4

    function process_response(webservice_response, callback) {
      var webservice_data = "";
      webservice_response.on('error', function (e) {
        console.log(e.message);
        callback('Error: ' + e.message);
      });
      webservice_response.on('data', function (chunk) {
        webservice_data += chunk;
      });
      webservice_response.on('end', function () {
        port_data = JSON.parse(webservice_data);
        console.log('port_data:', port_data.response[0]);
        callback();
      });
    }

    function grab_ports(cyclist, callback) {
//      console.log('running grab_ports');
      options = {
        host: 'iatacodes.org',
        path: '/api/v5/routes?departure=OMA&api_key=b871ce6f-b667-4ac8-b1c5-2b5a4e6840a4',
        method: 'GET'
      };

      // This is asynchronous - won't guarantee we get the response before we use it
      var webservice_request = http.request(options, function (webservice_response) {
        process_response(webservice_response, callback)
      });
      webservice_request.end();
    }

    //cycler array is used to tell async to cycle through array of 1 value; the current bob, that is
    var cycler = ["bob"];
    async.each(cycler, grab_ports, function (err) {
      if (err) console.log(err);
      console.log('async is done');
      console.log('port_data2:', port_data.response[0]);

      res.view({
        ports: port_data
      });
    });
  },

  create: function (req, res, next) {
    Trip.create(req.params.all(), function tripCreated(err, trip) {
      if (err) return next(err);

      res.redirect('/trip/show/' + trip.id);
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

  edit: function (req, res, next) {
    Trip.findOne(req.param('id'), function foundTrip(err, trip) {
      if (err) return next(err);
      if (!trip) return next();

      res.view({
        trip: trip
      });
    });
  },

  update: function (req, res, next) {
    Trip.update(req.param('id'), req.params.all(), function tripUpdated(err) {
      if (err) {
        return res.redirect('/trip/edit/' + req.param('id'));
      }

      res.redirect('/customer/');
    });
  },

  destroy: function (req, res, next) {
    Trip.destroy(req.param('id')).populateAll().exec(function (err, trip) {
      if (err) return next(err);

      //this should show the one customer..
      res.redirect('/customer/');
    });
  }
};
