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

    price: {
      type: 'float'
    },

    refNum: {
      type: 'string'
    },

    numRooms: {
      type: 'number'
    },

    //hotwire savings in percent
    deal: {
      type: 'float'
    }

  }
};

