/**
 * Ride.js
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

    capacity: {
      type: 'string'
    },

    costMin: {
      type: 'float'
    },

    costDist: {
      type: 'string'
    }

  }
};

