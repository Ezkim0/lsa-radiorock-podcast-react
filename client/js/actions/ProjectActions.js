var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProjectConstants = require('../constants/ProjectConstants');
var ProjectStore = require('../stores/ProjectStore');

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var client = rest.wrap(mime);

// Define actions object
var ProjectEditorActions = {

  // Load project data
  loadProject: function(projectId) {
    client({path: '/api/projects/' + projectId}).then(function(response) {
        ProjectEditorActions.receiveProject(response.entity);
    });
  },  

  // Load project data
  loadProjects: function() {
    client({path: '/api/projects'}).then(function(response) {
        ProjectEditorActions.receiveProjects(response.entity);
    });
  },

  loadCompanyProjects: function(companyId) {
    client({path: '/api/companies/' + companyId + '/projects'}).then(function(response) {
        ProjectEditorActions.receiveProjects(response.entity);
    });
  },

  saveProject: function(projectId) {
    var prj = ProjectStore.getProject();
    client(
      {
        method:'PUT', path: '/api/projects/' + prj._id, 
        entity:prj,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(function(response) {
        AppDispatcher.handleAction({
          actionType: ProjectConstants.PROJECT_SAVED
        });
      });
      AppDispatcher.handleAction({
        actionType: ProjectConstants.SAVE_PROJECT
      });
  },

  createProject: function(prj) {
    client(
      {
        method:'POST', path: '/api/projects', 
        entity:prj,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(function(response) {
        window.location.href = '/projects/' + response.entity._id;
      });
  },  
  
  editName: function(data) {
    console.log('editProjectName:', data);
    AppDispatcher.handleAction({
      actionType: ProjectConstants.EDIT_PROJECT_NAME,
      data: data
    })    
  },

  editCompany: function(data) {
    console.log('editProjectName:', data);
    AppDispatcher.handleAction({
      actionType: ProjectConstants.EDIT_PROJECT_COMPANY,
      data: data
    })    
  },

  editProject: function(data) {
    AppDispatcher.handleAction({
      actionType: ProjectConstants.EDIT_PROJECT,
      data: data
    })
  },

  // Receive inital product data
  receiveProject: function(data) {
    AppDispatcher.handleAction({
      actionType: ProjectConstants.RECEIVE_PROJECT,
      data: data
    })
  },
  
  // Receive inital product data
  receiveProjects: function(data) {
    AppDispatcher.handleAction({
      actionType: ProjectConstants.RECEIVE_PROJECTS,
      data: data
    })
  }
};

module.exports = ProjectEditorActions;