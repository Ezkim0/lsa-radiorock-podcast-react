var AppDispatcher = require('../dispatcher/AppDispatcher');
var CompanyConstants = require('../constants/CompanyConstants');
var CompanyStore = require('../stores/CompanyStore');

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var client = rest.wrap(mime);

// Define actions object
var CompanyActions = {

  loadCompanies: function() {
    client({path: '/api/companies'}).then(function(response) {
        CompanyActions.receiveCompanies(response.entity);
    });
  },

  // Load company data
  loadCompany: function(companyId) {
    client({path: '/api/companies/' + companyId}).then(function(response) {
        CompanyActions.receiveCompany(response.entity);
    });
  },

  saveCompany: function(companyId) {
    var prj = CompanyStore.getCompany();
    console.log('saving company', prj);
    client(
      {
        method:'PUT', path: '/api/companies/' + prj._id, 
        entity:prj,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(function(response) {
        AppDispatcher.handleAction({
          actionType: CompanyConstants.COMPANY_SAVED
        });
      });
      AppDispatcher.handleAction({
        actionType: CompanyConstants.SAVE_COMPANY
      });      
  },

  createCompany: function(com) {
    if (!com) { return; }
    client(
      {
        method:'POST', path: '/api/companies', 
        entity:com,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(function(response) {
        window.location.href = '/companies/' + response.entity._id;
      });
  }, 
  
  editName: function(data) {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.EDIT_COMPANY_NAME,
      data: data
    })
  },

  editCompany: function(data) {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.EDIT_COMPANY,
      data: data
    })
  },

  // Receive inital product data
  receiveCompany: function(data) {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.RECEIVE_COMPANY,
      data: data
    })
  },

  // Receive inital product data
  receiveCompanies: function(data) {
    AppDispatcher.handleAction({
      actionType: CompanyConstants.RECEIVE_COMPANIES,
      data: data
    })
  }
};

module.exports = CompanyActions;