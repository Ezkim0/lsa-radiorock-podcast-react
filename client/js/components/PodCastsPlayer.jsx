/** @jsx React.DOM */

var React = require('react');

// Method to retrieve state from Stores
module.exports = React.createClass({
  
  // Set the initial component state
  getInitialState: function(props) {
    props = props || this.props;

    // Set initial application state using props
    return {
      data: {}
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
      <div id="podcast-player" className="bottom-container animated player-animation">
        <div className="player-container">
          <audio id="music" preload="true">
            <source id="mp3Source"/>
            <source id="oggSource"/>
          </audio>
          <div id="audioplayer">
            <button id="pButton" onclick="play()" className="play"></button>
            <div id="timeline">
              <div id="playhead"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
});