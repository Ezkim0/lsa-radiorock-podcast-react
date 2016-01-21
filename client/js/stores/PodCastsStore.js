var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PodCastsConstants = require('../constants/PodCastsConstants');
var _ = require('underscore');

// Define initial data points
var _currentPage = 0;
var _podcasts = [];

// Method to load product data from mock API
function loadProject(data) {
  _text = data;
}


// Extend ProjectStore with EventEmitter to add eventing capabilities
var PodCastsStore = _.extend({}, EventEmitter.prototype, {

  getCurrentPage: function() {
    return _currentPage;
  },

  getNextPage: function() {
    _currentPage++;
    return _currentPage;
  },

  getPodCasts: function() {
    return _podcasts;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(action) {
  
  console.log("PodCastsStore " , action);

  switch(action.actionType) {

    case PodCastsConstants.PODCASTS_LOADED:
      _podcasts = _podcasts.concat(action.podcasts);
      break;    

    default:
      return true;
  }

  // If action was responded to, emit change event
  PodCastsStore.emitChange();

  return true;

});

module.exports = PodCastsStore;