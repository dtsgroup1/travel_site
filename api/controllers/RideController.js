/**
 * RideController
 *
 * @description :: Server-side logic for managing rides
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


// curl -H 'Authorization: Token 'kuhOpgaA1JkBbjFyJ7iaweUbCUVYZOrPlMFdMl8H' \'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823'
// npm install uber-api

/** var Uber = require('uber-api')({server_token:'kuhOpgaA1JkBbjFyJ7iaweUbCUVYZOrPlMFdMl8H',version:'v1'}),
 start_latitude = 41.3096180,
 start_longitude = -96.1500320,
 end_latitude = 41.2875140,
 end_longitude = -96.1502320;



 Uber.getProducts(start_latitude, start_longitude,end_latitude, end_longitude, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
});

 Uber.getPriceEstimate(start_latitude, start_longitude, end_latitude, end_longitude[callback]).then(function(response){
  console.log(response);
}, function(error){
  console.error(response);
});


 /** Uber.getProducts(lat, lon, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
});

 Uber.getProducts(lat, lon).then(function(response){
  console.log(response);
}, function(error){
  console.error(response);
});
 */

module.exports = {

  'new': function (req, res) {
    Trip.findOne(req.param('owner'), function foundTrip(err, trip) {
      if (err) return next(err);
      if (!trip) return next();
      res.view({
        trip: trip
      });
    });
  },

  'search': function (req, res, next) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      var uberLib = require('uber-api');
      var http = require('http');

        token = 'kuhOpgaA1JkBbjFyJ7iaweUbCUVYZOrPlMFdMl8H',
        Uber = new uberLib(token, 'v1'),

      //Lat and longitude will carry over from Hotel API
        lat = 36,
        lon = -94;

      Uber.getProducts(lat, lon, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
          console.log(body);
        }
      });

    });
  }

};

