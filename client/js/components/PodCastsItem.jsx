/** @jsx React.DOM */

var React = require('react');
var moment = require('moment');
var PodCastsPlayerActions = require('../actions/PodCastsPlayerActions');
var PodCastsPlayer = require('./PodCastsPlayer.jsx');
var PodCastsStore = require('../stores/PodCastsStore');

function getPodCastsItemState() {
  return {
    currentPodCastUrl: PodCastsStore.getCurrentUrl()
  };
}

module.exports = React.createClass({
  
  getInitialState: function(props) {
    props = props || this.props;

    return {
      data: props.data,
      currentPodCastUrl: null,
      index: props.index
    };
  },

  parseDate : function(string) {
    return moment(string).format("D.M.YYYY - h:mm");
  },

  playPodcast : function(filename) {
    console.log("playPodcast");
    PodCastsPlayerActions.setPodCastFilename(filename);
  },

  render: function() {

    var content;

    if(this.state.currentPodCastUrl){
      console.log(">>>>: " + this.state.currentPodCastUrl);
    }
    
    if (this.state.data) {
      content = 
        <div className="offer offer-danger">
          <div className="offer-header">
            <h3 className="lead">{this.parseDate(this.state.data.date)}</h3>
          </div>
          <div className="play-button-container">
            <button onClick={this.playPodcast.bind(this,this.state.data.filename)}>PLAY</button>
          </div>
          <div className="offer-content">
            <h4 className="offer-content">{this.state.data.media.title}</h4>
          </div>
        </div>
    } else {
      content = 
        <div className="offer offer-danger">
          <div className="offer-header">
            <h3 className="lead">Error loading data!</h3>
          </div>
          <div className="play-button-container">            
          </div>
          <div className="offer-content">            
          </div>
        </div>

    }

    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 test" >
        {content}
      </div>
    );
  }
  
});