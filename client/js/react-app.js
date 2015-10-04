/** @jsx React.DOM */
var React = require('react');
var ReactAppTest = require('./ReactAppTest.jsx');

// Render the components, picking up where react left off on the server
React.render(
  <ReactAppTest name='Matti Murtonen'/>,
  document.getElementById('react-app')
);