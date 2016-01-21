/** @jsx React.DOM */

var React = require('react');
var PodCastsPlayerStore = require('../stores/PodCastsPlayerStore');
var PodCastsPlayerActions = require('../actions/PodCastsPlayerActions');
var audio;

function getPodCastPlayerState() {
  return {
    currentPodCastUrl: PodCastsPlayerStore.getCurrentUrl(),
    play: PodCastsPlayerStore.getPlaying()
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
    PodCastsPlayerStore.addChangeListener(this._onChange);
    audio = document.getElementById('music');
    audio.addEventListener('canplaythrough', this.soundLoaded, false);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    PodCastsPlayerStore.removeChangeListener(this._onChange);
  },

  play: function() {
    console.log("PLAYING status: " + PodCastsPlayerStore.getPlaying());
    PodCastsPlayerStore.setPlayStatus(!PodCastsPlayerStore.getPlaying());
    this.setState(getPodCastPlayerState());
  },

  soundLoaded: function() {
    console.log("canplay");
    audio.play();
  },

  render: function() {
    console.log("PodCastsPlayer: " + this.state.currentPodCastUrl);
    var audioSrc;

    if(this.state.currentPodCastUrl && this.state.play){
      var audioSrc = this.state.currentPodCastUrl;

      audio.load();
      //audio.play();
    } else if (this.state.currentPodCastUrl && !this.state.play) {
      document.getElementById('music').pause();
    }
    
    return (
      <div id="podcast-player" className="bottom-container">
        <div className="player-container">
          <audio id="music" preload="true">
            <source src={this.state.currentPodCastUrl} />
          </audio>
          <div id="audioplayer">
            <button id="pButton" onClick={this.play} className={this.state.play ? 'pause' : 'play'}></button>
            <div id="timeline">
              <div id="playhead"></div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    console.log("....... _onChange PodCastsPlayer");
    this.setState(getPodCastPlayerState());
  }
  
});