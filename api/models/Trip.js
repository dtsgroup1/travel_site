/**
 * Trip.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

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

    owner: {
      model: 'customer',
      required: true
    }

  }
};

