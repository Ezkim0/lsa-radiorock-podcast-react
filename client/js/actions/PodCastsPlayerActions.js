var AppDispatcher = require('../dispatcher/AppDispatcher');
var PodCastsConstants = require('../constants/PodCastsConstants');
var PodCastsStore = require('../stores/PodCastsStore');

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var client = rest.wrap(mime);

var PodCastsPlayerActions = {

  // Load new page
  loadCompany: function(companyId) {
    client({path: '/api/companies/' + companyId}).then(function(response) {
        PodCastsPlayerActions.receiveCompany(response.entity);
    });
  },
  
  // Receive inital product data
  receiveCompany: function(data) {
    AppDispatcher.handleAction({
      actionType: PodCastsConstants.RECEIVE_COMPANY,
      data: data
    })
  },

  // Load podcasts by page
  loadPodCasts: function(page) {
    client({
      path: 'api/podcasts/all?page=' + page
    }).then(function(response) {
      
      console.log(response.entity);

      AppDispatcher.dispatch({
        actionType: PodCastsConstants.PODCASTS_LOADED,
        podcasts: response.entity
      });
    });
  },

  // Set podcastfile to podcastplayer
  setPodCastFilename: function(item, filename) {
    AppDispatcher.dispatch({
      actionType: PodCastsConstants.SET_PODCAST,
      podCastFilename: filename,
      item: item
    });
  },

  // Set status of pause
  setPauseStatus: function(status) {
    AppDispatcher.dispatch({
      actionType: PodCastsConstants.SET_PAUSE_STATUS,
      status: status
    });
  },

  // Set status of loaded
  // Loaded is true when podcast player have loaded podcast and start playing it
  setLoadedStatus: function(status) {
    AppDispatcher.dispatch({
      actionType: PodCastsConstants.SET_LOADED_STATUS,
      status: status
    });
  },

};

module.exports = PodCastsPlayerActions;