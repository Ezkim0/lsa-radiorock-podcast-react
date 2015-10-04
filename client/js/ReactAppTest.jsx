/** @jsx React.DOM */
var React = require('react');

// Method to retrieve state from Stores
module.exports = React.createClass({
  
  // Set the initial component state
  getInitialState: function(props) {
    props = props || this.props;

    // Set initial application state using props
    //console.log(this.props.items);

    return {
      items: {}
    };
  },

  // Add change listeners to stores
  componentDidMount: function() {
    
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    
  },

  render: function() {
    var documentRows = "";

    if (this.props.items) {
      documentRows = this.props.items.map(function(variant, index) {
        return (
          <tr key={index} height="200px">
            <td>{variant.media.title}</td>
            <td>{variant.media.description}</td>
            <td>TEST</td>
            <td>TEST</td>
          </tr>
        )
      }, this);
    }

    return (
      <div>
        <h1>React Test: {this.props.name}</h1>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>TEST</th>
              <th>TEST</th>
            </tr>
          </thead>
          <tbody>
            {documentRows}
          </tbody>            
      </table>
      </div>
    );
  }
  
});