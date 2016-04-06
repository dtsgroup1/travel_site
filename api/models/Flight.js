/**
 * Flight.js
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

    carrier: {
      type: 'string'
    },

    num: {
      type: 'string'
    },

    stops: {
      type: 'string'
    },

    departure: {
      type: 'string'
    },

    arrival: {
      type: 'string'
    }

  }
};

