/** @jsx React.DOM */

var React = require('react');
var PodCastsStore = require('../stores/PodCastsStore');
var PodCastsPlayerActions = require('../actions/PodCastsPlayerActions');

function getPodCastPlayerState() {
  return {
    currentPodCastUrl: PodCastsStore.getCurrentUrl(),
    play: PodCastsStore.getPlaying()
  };
}

// Method to retrieve state from Stores
module.exports = React.createClass({
  
  // Set the initial component state
  getInitialState: function(props) {
    props = props || this.props;

    // Set initial application state using props
    return {
      currentPodCastUrl: null,
      play: false
    };
  },

  // Add change listeners to stores
  componentDidMount: function() {
    PodCastsStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    PodCastsStore.removeChangeListener(this._onChange);
  },

  play: function() {
    console.log("PLAY!");
  },

  render: function() {

    console.log("PodCastsPlayer");
    console.log(this.state.currentPodCastUrl);
   
    if(this.state.currentPodCastUrl && this.state.play){
      var audio = document.getElementById('music');

      var source = document.getElementById('mp3Source');
      source.src= this.state.currentPodCastUrl;

      audio.load();
      audio.play();
    }

    return (
      <div id="podcast-player" className="bottom-container animated player-animation">
        <div className="player-container">
          <audio id="music" preload="true">
            <source id="mp3Source"/>
            <source id="oggSource"/>
          </audio>
          <div id="audioplayer">
            <button id="pButton" onClick={this.play} className="play"></button>
            <div id="timeline">
              <div id="playhead"></div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    console.log(".......");
    this.setState(getPodCastPlayerState());
  }

  
});