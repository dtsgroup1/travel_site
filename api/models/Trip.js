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
    },

    flightNum: {
      type: 'string'
    },

    hotel: {
      type: 'string'
    },

    uberNum: {
      type: 'string'
    },

    entertainment: {
      type: 'string'
    }

  }
};

