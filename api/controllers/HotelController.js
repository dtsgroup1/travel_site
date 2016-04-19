/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {

  create: function (req, res, next) {
    Flight.create(req.params.all(), function stockCreated(err, hotel) {
      if (err) return next(err);

      res.redirect('/trip/show/' + hotel.owner);
    });
  },

  show: function (req, res, next) {
    Trip.findOne(req.param('id')).populateAll().exec(function (err, trip) {
      var Hotwire = require('hotwire');
      //api key
      var hotwire = new Hotwire('qba8knkmf9ahgzbm6rmy988g');
      //parse date from last saved flight object
      var delims = /([T\-])/;
      var date = trip.flights[trip.flights.length-1].arrival.split(delims);
      //destination translation from one of Eppley's direct flight locations
      if (trip.destination == 'OMA') {
        var destTrans = 'Omaha';
      } else if (trip.destination == 'DFW') {
        var destTrans = 'Dallas';
      } else if (trip.destination == 'DEN') {
        var destTrans = 'Denver';
      }

      hotwire.hotelDeals({
        format: 'json',
        //startdate needs to come from flight for assignment requirements
        startdate: date[2]+'/'+date[4]+'/'+date[0],
        dest: destTrans,
        limit: '5'
      }, function (err, response, body) {
        if (err) {
          console.log(err);
        }
        console.log(response.statusCode);
        console.log(date);
        var hotels = JSON.parse(body).Result;
        console.log(hotels[0]);


        res.view({
          trip: trip,
          hotels: hotels
        })

      })

    });
  }
};





