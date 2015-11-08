/** @jsx React.DOM */

var React = require('react');
var moment = require('moment');
var baseUrl = "http://d3ac2fc8l4ni8x.cloudfront.net/";

module.exports = React.createClass({
  
  getInitialState: function(props) {
    props = props || this.props;

    return {
      data: props.data,
      index: props.index
    };
  },

  componentDidMount: function() {
    
  },

  componentWillUnmount: function() {
    
  },

  parseDate : function(string) {
    return moment(string).format("D.M.YYYY - h:mm");
  },

  playPodcast : function(filename) {
    console.log("playPodcast");
    console.log(filename);
    
    // http://www.alexkatz.me/codepen/music/interlude.mp3
    // http://www.alexkatz.me/codepen/music/interlude.ogg

    /*var audio = document.getElementById('music');

    var source = document.getElementById('mp3Source');
    source.src=baseUrl + filename;

    audio.load(); 
    audio.play(); */

    //TODO: send file to player FLUX
    
  },

  render: function() {

    var content;
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

    /*<div key={this.state.index} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 test" >
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
      </div>*/

    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 test" >
        {content}
      </div>
    );
  }
  
});