var AppDispatcher = require('../dispatcher/AppDispatcher');
var CompanyConstants = require('../constants/CompanyConstants');
var CompanyStore = require('../stores/CompanyStore');

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var client = rest.wrap(mime);

// Define actions object
var CompanyActions = {

  // Load company data
  loadCompany: function(companyId) {
    client({path: '/api/companies/' + companyId}).then(function(response) {
        CompanyActions.receiveCompany(response.entity);
    });
  },
  
  // Receive inital product data
  receiveCompany: function(data) {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.RECEIVE_COMPANY,
      data: data
    })
  }
};

module.exports = CompanyActions;