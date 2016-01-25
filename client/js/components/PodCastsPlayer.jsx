/** @jsx React.DOM */

var React = require('react');
var PodCastsPlayerStore = require('../stores/PodCastsPlayerStore');
var PodCastsPlayerActions = require('../actions/PodCastsPlayerActions');
var audio;

function getPodCastPlayerState() {
  return {
    currentPodCastUrl: PodCastsPlayerStore.getCurrentUrl(),
    paused: PodCastsPlayerStore.getPaused(),
    loaded: PodCastsPlayerStore.getLoaded(),
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
      paused: false,
      loaded: false
    };
  },

  // Add change listeners to stores
  componentDidMount: function() {
    PodCastsPlayerStore.addChangeListener(this._onChange);
    audio = React.findDOMNode(this.refs.audio_tag);
    audio.addEventListener('canplay', this.soundLoaded, false);
  },

  soundLoaded: function () {
    if (this.state.currentPodCastUrl && this.state.paused && !this.state.loaded ) {
      audio.play();
      PodCastsPlayerStore.setLoadedStatus(true);
    }
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    PodCastsPlayerStore.removeChangeListener(this._onChange);
  },

  componentDidUpdate: function() {
    console.log("componentDidUpdate " + this.state.loaded);
    console.log("componentDidUpdate " + this.state.currentPodCastUrl);
    //audio.load();
    //audio.play();

    if(this.state.currentPodCastUrl && !this.state.loaded) {
      console.log("TÄNNE! -1");
      audio.load();
      return;
    }

    if (this.state.currentPodCastUrl && !this.state.paused ) {
      console.log("TÄNNE! -2 ");
      audio.pause();
    }

    if (this.state.currentPodCastUrl && this.state.paused ) {
      console.log("TÄNNE! -3 ");
      audio.play();
    }

  },

  play: function() {
    console.log("PLAYING status: " + PodCastsPlayerStore.getPaused());
    PodCastsPlayerStore.setPauseStatus(!PodCastsPlayerStore.getPaused());
    this.setState(getPodCastPlayerState());
  },

  render: function() {
    console.log("PodCastsPlayer: " + this.state.paused);
    var audioSrc;

    return (
      <div id="podcast-player" className="bottom-container">
        <div className="player-container">
          <audio ref="audio_tag" id="music" preload="auto" >§
            <source src={this.state.currentPodCastUrl} />
          </audio>
          <div id="audioplayer">
            <button id="pButton" onClick={this.play} className={this.state.paused ? 'pause' : 'play'}></button>
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