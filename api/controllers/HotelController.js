/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {


  show: function (req, res, next) {

    var Hotwire = require('hotwire');

//api key
    var hotwire = new Hotwire('qba8knkmf9ahgzbm6rmy988g');
    hotwire.hotelDeals({
      format: 'json',
      startdate: '04/29/2016',
      dest: 'Omaha',
      limit: '5'
    }, function (err, response, body) {
      if (err) {
        console.log(err);
      }
      console.log(response.statusCode);
      console.log(JSON.parse(body).Result);
      var hotels = JSON.parse(body).Result;


      res.view({
        hotels: hotels
      })

    })

  }
};





