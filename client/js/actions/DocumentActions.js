var AppDispatcher = require('../dispatcher/AppDispatcher');
var DocumentConstants = require('../constants/DocumentConstants');
var DocumentStore = require('../stores/DocumentStore');
var _ = require('underscore');

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var client = rest.wrap(mime);

// Define actions object
var DocumentActions = {

  // Load document data
  loadProjectDocuments: function(projectId) {
    client({path: '/api/projects/' + projectId + '/documents'}).then(function(response) {
      DocumentActions.receiveProjectDocuments(response.entity);
    });
  },

  // Load document data
  loadDocument: function(documentId) {
    client({path: '/api/documents/' + documentId}).then(function(response) {
        DocumentActions.receiveDocument(response.entity);
    });
  },

  loadDocuments: function() {
    client({path: '/api/documents'}).then(function(response) {
      AppDispatcher.handleAction({
        actionType: DocumentConstants.RECEIVE_DOCUMENTS,
        data: response.entity
      })
    });
  },  

  saveDocument: function() {
    var doc = DocumentStore.getDocument();
    
    client(
      {
        method:'PUT', path: '/api/documents/' + doc._id, 
        entity:doc,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(function(response) {
        AppDispatcher.handleAction({
          actionType: DocumentConstants.DOCUMENT_SAVED
        });
      });

    AppDispatcher.handleAction({
      actionType: DocumentConstants.SAVE_DOCUMENT
    });
  },

  saveAsTemplate: function(data) {
    var template = {}
    template.name = data.name;
    template.isTemplate = true;
    template.elements = _.clone(data.data.elements);
    
    client(
      {
        method:'POST', path: '/api/documents', 
        entity:template,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(function(response) {
        console.log('Template Created');
      });
  },

  loadTemplates: function(projectId) {
    client({path: '/api/templates'}).then(function(response) {
      AppDispatcher.handleAction({
        actionType: DocumentConstants.RECEIVE_TEMPLATES,
        data: response.entity
      })
    });
  },

  loadTemplate: function(template) {
    AppDispatcher.handleAction({
      actionType: DocumentConstants.LOAD_TEMPLATE,
      data: template
    })
  },

  editDocument: function(data) {
    AppDispatcher.handleAction({
      actionType: DocumentConstants.EDIT_DOCUMENT,
      data: data
    })
  },

  createDocument: function(doc) {
    client(
      {
        method:'POST', path: '/api/documents', 
        entity:doc,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(function(response) {
        window.location.href = '/documents/' + response.entity._id;
      });
  },

  // Receive inital product data
  receiveDocument: function(data) {
    AppDispatcher.handleAction({
      actionType: DocumentConstants.RECEIVE_DOCUMENT,
      data: data
    })
  },

  // Receive inital product data
  receiveProjectDocuments: function(data) {
    AppDispatcher.handleAction({
      actionType: DocumentConstants.RECEIVE_DOCUMENTS,
      data: data
    })
  },

  addDocumentElement: function(data) {
    AppDispatcher.handleAction({
      actionType: DocumentConstants.ADD_DOCUMENT_ELEMENT,
      data: data
    })
  },

  editElement: function(element, property, value) {
    AppDispatcher.handleAction({
      actionType: DocumentConstants.EDIT_ELEMENT,
      object: element,
      property: property,
      value: value
    })
  },

  editDocumentElement: function(data) {
    AppDispatcher.handleAction({
      actionType: DocumentConstants.EDIT_DOCUMENT_ELEMENT,
      data: data
    })
  },

  removeDocumentElement: function(data) {
    AppDispatcher.handleAction({
      actionType: DocumentConstants.REMOVE_DOCUMENT_ELEMENT,
      data: data
    })
  },

  moveElement: function(fromIndex, toIndex) {
    AppDispatcher.handleAction({
      actionType: DocumentConstants.MOVE_DOCUMENT_ELEMENT,
      fromIndex: fromIndex,
      toIndex: toIndex
    })
  },

  applyPreset: function(preset, element) {
    AppDispatcher.handleAction({
      actionType: DocumentConstants.APPLY_PRESET,
      preset: preset,
      element: element
    })
  },

  createPDF: function() {

    var doc = DocumentStore.getDocument();
    
    client({ method:'GET', path: '/api/documents/' + doc._id + '/create-pdf' }).then(function(response) {
      console.log('PDF CREATED');
    });

    /* OLD STUFF
    var postData = {
      "type": "movya_offers", 
      "data": doc, 
      "options": {"attempts": 5, "priority": "high"} 
    };

    client(
      {
        method:'POST', path: 'http://steve.app.movya.fi:3000/job', 
        entity: postData,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(function(response) {
        console.log('PDF job created', response);
      });
    */
  }

};

module.exports = DocumentActions;