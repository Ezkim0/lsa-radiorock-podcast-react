var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PodCastsConstants = require('../constants/PodCastsConstants');
var _ = require('underscore');

var _currentPage = 0;
var _podcasts = [];

function loadProject(data) {
  _text = data;
}


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

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register(function(action) {
  
  switch(action.actionType) {

    case PodCastsConstants.PODCASTS_LOADED:
      console.log("......>>>>> " + _podcasts);
      if(action.podcasts) {
        if(action.podcasts.length > 0) {
          _podcasts = _podcasts.concat(action.podcasts);
        }
      }
      
      break;    

    default:
      return true;
  }

  PodCastsStore.emitChange();
  return true;

});

module.exports = PodCastsStore;