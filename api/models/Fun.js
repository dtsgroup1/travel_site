/**
 * Fun.js
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

    //name of businesses returned by yelp
    options: {
      type: 'list'
    },

    rating: {
      type: 'string'
    },

    phone: {
      type: 'number'
    },

    url: {
      type: 'string'
    }

  }
};

