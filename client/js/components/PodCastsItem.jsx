/** @jsx React.DOM */

var React = require('react');
var moment = require('moment');
var PodCastsPlayerActions = require('../actions/PodCastsPlayerActions');
var PodCastsPlayer = require('./PodCastsPlayer.jsx');
var PodCastsStore = require('../stores/PodCastsStore');
var PodCastsPlayerStore = require('../stores/PodCastsPlayerStore');

function getPodCastsItemState(id) {
  return {
    currentPodCastUrl: PodCastsPlayerStore.getCurrentUrl(),
    loaded: PodCastsPlayerStore.getLoaded(id),
    paused: PodCastsPlayerStore.getPaused(id),
    selected: PodCastsPlayerStore.selected(id)
  };
}

module.exports = React.createClass({
  
  getInitialState: function(props) {
    props = props || this.props;

    return {
      data: props.data,
      currentPodCastUrl: null,
      index: props.index,
      loaded: false,
      paused: false,
      selected: false
    };
  },

  componentDidMount: function() {
    PodCastsPlayerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PodCastsPlayerStore.removeChangeListener(this._onChange);
  },

  parseDate : function(string) {
    return moment(string).format("D.M.YYYY - h:mm");
  },

  playPodcast : function(filename) {
    PodCastsPlayerActions.setPodCastFilename(this.state.data,filename);
    this.setState({loaded: false, selected: true});
  },

  render: function() {

    var content;
    if (this.state.data) {
      var btn = <button onClick={this.playPodcast.bind(this,this.state.data.filename)}>PLAY</button>;

      if(this.state.selected) {
        if (!this.state.loaded) {
          btn = <span className="glyphicon glyphicon-option-horizonta" />
        } else {
          if (this.state.paused) {
            //btn = <span className="glyphicon glyphicon-pause" />
            btn = <span>Playing...</span>
          } else {
            //btn = <span className="glyphicon glyphicon-play" />
            btn = <span>Paused...</span>
          }
        }
      }      

      content = 
        <div className="offer offer-danger animated fadeIn">
          <div className="offer-header">
            <h3 className="lead">{this.parseDate(this.state.data.date)}</h3>
          </div>
          <div className="play-button-container">
            {btn}
          </div>
          <div className="offer-content">
            <h4 className="offer-content">{this.state.data.media.title}</h4>
          </div>
        </div>
    } else {
      content = 
        <div className="offer offer-danger animated fadeIn">
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
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" >
        {content}
      </div>
    );
  },

  _onChange: function() {
    console.log("....... _onChange PodCastsItem " + this.state.data._id);
    this.setState(getPodCastsItemState(this.state.data._id));
  }
  
});