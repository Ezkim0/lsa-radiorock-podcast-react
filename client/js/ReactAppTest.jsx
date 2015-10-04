/** @jsx React.DOM */

var React = require('react');

// Method to retrieve state from Stores
module.exports = React.createClass({
  
  // Set the initial component state
  getInitialState: function(props) {
    props = props || this.props;

    // Set initial application state using props
    return {
      testData: {}
    };
  },

  // Add change listeners to stores
  componentDidMount: function() {
    
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    
  },

  render: function() {
    return (
      <div>
        <h1>React Test: {this.props.name}</h1>
      </div>
    );
  }
  
});