/** @jsx React.DOM */
var React = require('react');
var ReactAppTest = require('./ReactAppTest.jsx');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

// Render the components, picking up where react left off on the server
React.render(
  <ReactAppTest items={initialState}/>,
  document.getElementById('react-app')
);