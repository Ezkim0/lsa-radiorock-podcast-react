/** @jsx React.DOM */

var React = require('react');
var ProjectList = require('./components/ProjectList.jsx');
var ProjectActions = require('./actions/ProjectActions');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// Initial state that was passed from the server side
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

// Render the components, picking up where react left off on the server
React.render(
  <ProjectList projects={initialState} />,
  document.getElementById('projects-app')
);

ProjectActions.loadProjects();