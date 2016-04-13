var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PodCastsConstants = require('../constants/PodCastsConstants');
var _ = require('underscore');

var _paused = false;
var _loaded = false;
var _podCastUrl;
var _item;
var _baseUrl = "http://d3ac2fc8l4ni8x.cloudfront.net/";

// Method to load product data from mock API
function loadProject(data) {
  _text = data;
}

// Extend ProjectStore with EventEmitter to add eventing capabilities
var PodCastsPlayerStore = _.extend({}, EventEmitter.prototype, {

  getPaused: function(id) {
    if(id && _item) {
      if(id === _item._id) {
        return _paused;
      } else {
        return true;
      }
    }

    return _paused;
  },

  getLoaded: function(id) {
    if(id && _item) {
      if(id === _item._id) {
        return _loaded;
      } else {
        return false;
      }
    }

    return _loaded;
  },

  getItem: function() {
    return _item;
  },

  selected: function(id) {
    if(id && _item) {
      if(id === _item._id) {
        return true;
      } else {
        return false;
      }
    }
  },


  getCurrentUrl: function() {
    var returnValue;
    if(_podCastUrl){
      returnValue = _baseUrl + _podCastUrl;
    }
    return returnValue;
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
  
  console.log("PodCastsPlayerStore " , action);

  switch(action.actionType) {
    
    case PodCastsConstants.SET_PODCAST:
      //console.log(".......... " + action.podCastFilename);
      _podCastUrl = action.podCastFilename;
      _item = action.item;
      _paused = true;
      _loaded = false;
      break;

    case PodCastsConstants.SET_PAUSE_STATUS:
      _paused = action.status;
      break;
    
    case PodCastsConstants.SET_LOADED_STATUS:
      _loaded = action.status;
      break;
      
    default:
      return true;
  }

  // If action was responded to, emit change event
  PodCastsPlayerStore.emitChange();

  return true;

});

module.exports = PodCastsPlayerStore;