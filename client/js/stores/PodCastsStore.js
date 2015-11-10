var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PodCastsConstants = require('../constants/PodCastsConstants');
var _ = require('underscore');

// Define initial data points
var _text = null;
var _currentPage = 0;

// Method to load product data from mock API
function loadProject(data) {
  _text = data;
}


// Extend ProjectStore with EventEmitter to add eventing capabilities
var PodCastsStore = _.extend({}, EventEmitter.prototype, {

  getCurrentPage: function() {
    return _currentPage;
  },

  loadPodCasts: function() {
    return _text;
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
  var text;

  switch(action.actionType) {

    case PodCastsConstants.PODCASTS_TEST:
      console.log("PODCASTS_TEST" + action.text);  
      _text = action.text;
      //text = action.text.trim();
      /*if (text !== '') {
        update(action.id, {text: text});
        PodCastsStore.emitChange();
      }*/
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  PodCastsStore.emitChange();

  return true;

});

module.exports = PodCastsStore;