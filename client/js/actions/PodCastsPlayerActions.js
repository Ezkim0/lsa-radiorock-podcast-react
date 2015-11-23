var AppDispatcher = require('../dispatcher/AppDispatcher');
var PodCastsConstants = require('../constants/PodCastsConstants');
var PodCastsStore = require('../stores/PodCastsStore');

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var client = rest.wrap(mime);

// Define actions object
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


  loadPodCasts: function(page) {
    console.log("loadPodCasts " + page);

    //var page = PodCastsStore.getCurrentPage();
    //console.log("testText " + page);

    client({
      path: 'api/podcasts/all?page=' + page
    }).then(function(response) {
      AppDispatcher.dispatch({
        actionType: PodCastsConstants.PODCASTS_LOADED,
        podcasts: response.entity
      });
    });

  },

  setPodCastFilename: function(filename) {
    AppDispatcher.dispatch({
      actionType: PodCastsConstants.SET_PODCAST,
      podCastFilename: filename
    });

  },



};

module.exports = PodCastsPlayerActions;