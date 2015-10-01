var AppDispatcher = require('../dispatcher/AppDispatcher');
var PresetConstants = require('../constants/PresetConstants');
var PresetStore = require('../stores/PresetStore');

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var client = rest.wrap(mime);

// Define actions object
var PresetActions = {

  loadPresets: function() {
    client({path: '/api/presets'}).then(function(response) {
        PresetActions.receivePresets(response.entity);
    });
  },

  loadPresetsByType: function(type) {    
    client({path: '/api/presets/type/' + type}).then(function(response) {
        PresetActions.receivePresets(response.entity);
    });
  },

  // Load preset data
  loadPreset: function(presetId) {
    client({path: '/api/presets/' + presetId}).then(function(response) {
      PresetActions.receivePreset(response.entity);
    });
  },

  savePreset: function(preset) {

    preset = preset || PresetStore.getPreset();

    if (!preset) { return; }

    if (preset._id) {
      client(
        {
          method:'PUT', path: '/api/presets/' + preset._id, 
          entity:preset,
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        }).then(function(response) {
          AppDispatcher.handleAction({
            actionType: PresetConstants.PRESET_SAVED
          });          
        });
    } else {
      client(
        {
          method: 'POST', path: '/api/presets',
          entity: preset,
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        }).then(function(response) {
          AppDispatcher.handleAction({
            actionType: PresetConstants.PRESET_SAVED
          });
        });
    }
    AppDispatcher.handleAction({
      actionType: PresetConstants.SAVE_PRESET
    });
  },

  createPreset: function(preset) {
    client(
      {
        method:'POST', path: '/api/presets', 
        entity:preset,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(function(response) {
        window.location.href = '/presets/' + response.entity._id;
      });
  },

  editType: function(data) {
    AppDispatcher.handleAction({
      actionType: PresetConstants.EDIT_PRESET_TYPE,
      data: data
    })
  },

  editName: function(data) {
    AppDispatcher.handleAction({
      actionType: PresetConstants.EDIT_PRESET_NAME,
      data: data
    })
  },

  editData: function(element, property, value) {
    AppDispatcher.handleAction({
      actionType: PresetConstants.EDIT_PRESET_DATA,
      object: element,
      property: property,
      value: value
    })
  },

  editPreset: function(data) {
    AppDispatcher.handleAction({
      actionType: PresetConstants.EDIT_PRESET,
      data: data
    })
  },

  // Receive inital product data
  receivePreset: function(data) {
    AppDispatcher.handleAction({
      actionType: PresetConstants.RECEIVE_PRESET,
      data: data
    })
  },

  // Receive inital product data
  receivePresets: function(data) {
    AppDispatcher.handleAction({
      actionType: PresetConstants.RECEIVE_PRESETS,
      data: data
    })
  }
};

module.exports = PresetActions;