/** @jsx React.DOM */
var React = require('react');
var PodCastsApp = require('./components/PodCastsApp.jsx');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

// Render the components, picking up where react left off on the server
React.render(
  <PodCastsApp items={initialState}/>,
  document.getElementById('react-app')
);



