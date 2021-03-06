/**
 * Hotel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    owner: {
      model: 'trip',
      required: true
    },

    //currently used for Latitude
    price: {
      type: 'string'
    },

    //currently used for Longitude
    refNum: {
      type: 'string'
    },

    numRooms: {
      type: 'string'
    },

    //hotwire savings in percent
    deal: {
      type: 'string'
    }

  }
};

