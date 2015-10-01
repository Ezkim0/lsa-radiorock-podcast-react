var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProjectConstants = require('../constants/ProjectConstants');
var _ = require('underscore');

// Define initial data points
var _project = null;
var _projects = [];
var _saving = false;

// Method to load product data from mock API
function loadProject(data) {
  _project = data;
}

function loadProjects(data) {
  _projects = data;
}

function editProject(data) {
  // do nothing ... yet
}

function editName(data) {
  if (!_project) { return; }
  _project.name = data;
}

function editCompany(data) {
  if (!_project) { return; }
  _project.company = data;
}

function setSavingState(data) {
  _saving = (data === true);
}

// Extend ProjectStore with EventEmitter to add eventing capabilities
var ProjectStore = _.extend({}, EventEmitter.prototype, {

  // Return Project data
  getProject: function() {
    return _project;
  },

  // Return Project data
  getProjects: function() {
    console.log('_projects',_projects);
    return _projects;
  },
  
  getName: function() {
    if (!_project) { return null; }
    return _project.name;
  },
  
  getCompanyId: function() {
    if (!_project) { return null; }
    if (!_project.company) { return null; }
    return _project.company._id;
  },

  getProjectId: function() {
    if (!_project) { return null; }
    return _project._id;
  },
  
  getDocuments: function() {
    if (!_project) { return null; }
    return _project.documents;
  },

  isSaving: function() {
    return _saving;
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
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {

    // Respond to RECEIVE_DATA action
    case ProjectConstants.RECEIVE_PROJECT:
      loadProject(action.data);
      break;

    // Respond to RECEIVE_DATA action
    case ProjectConstants.RECEIVE_PROJECTS:
      loadProjects(action.data);
      break;

    case ProjectConstants.EDIT_PROJECT:
      editProject(action.data);
      break;

    case ProjectConstants.EDIT_PROJECT_NAME:
      editName(action.data);
      break;

    case ProjectConstants.EDIT_PROJECT_COMPANY:
      editCompany(action.data);
      break;

    case ProjectConstants.SAVE_PROJECT:
      setSavingState(true);
      break;

    case ProjectConstants.PROJECT_SAVED:
      setSavingState(false);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  ProjectStore.emitChange();

  return true;

});

module.exports = ProjectStore;