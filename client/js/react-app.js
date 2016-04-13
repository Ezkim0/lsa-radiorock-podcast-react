/** @jsx React.DOM */
var React = require('react');
var PodCastsApp = require('./components/PodCastsApp.jsx');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

React.render(
  <PodCastsApp items={initialState}/>,
  document.getElementById('react-app')
);



