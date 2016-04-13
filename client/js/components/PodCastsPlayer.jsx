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

module.exports = React.createClass({
  
  getInitialState: function(props) {
    props = props || this.props;

    return {
      currentPodCastUrl: null,
      paused: false,
      loaded: false
    };
  },

  componentDidMount: function() {
    PodCastsPlayerStore.addChangeListener(this._onChange);
    audio = React.findDOMNode(this.refs.audio_tag);
    audio.addEventListener('canplay', this.soundLoaded, false);
  },

  soundLoaded: function () {
    if (this.state.currentPodCastUrl && this.state.paused && !this.state.loaded ) {
      audio.play();
      PodCastsPlayerActions.setLoadedStatus(true);
    }
  },

  componentWillUnmount: function() {
    PodCastsPlayerStore.removeChangeListener(this._onChange);
  },

  componentDidUpdate: function() {

    if(this.state.currentPodCastUrl && !this.state.loaded) {
      audio.load();
      return;
    }

    if (this.state.currentPodCastUrl && !this.state.paused ) {
      audio.pause();
    }

    if (this.state.currentPodCastUrl && this.state.paused ) {
      audio.play();
    }

  },

  play: function() {
    PodCastsPlayerActions.setPauseStatus(!PodCastsPlayerStore.getPaused());
  },

  render: function() {
    var audioSrc;
    var playerClass = "bottom-container hidden";

    if(this.state.currentPodCastUrl){
      playerClass = "bottom-container animated fadeInUp";
    }

    return (
      <div id="podcast-player" className={playerClass}>
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