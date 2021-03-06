/**
 * Trip.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    owner: {
      model: 'customer',
      required: true
    },

    flights: {
      collection: 'flight',
      via: 'owner'
    },

    entertainment: {
      collection: 'fun',
      via: 'owner'
    },

    hotels: {
      collection: 'hotel',
      via: 'owner'
    },

    rides: {
      collection: 'ride',
      via: 'owner'
    },

    departureDate: {
      type: 'string'
    },

    returnDate: {
      type: 'string'
    },

    origin: {
      type: 'string'
    },

    destination: {
      type: 'string'
    }

  }
};

