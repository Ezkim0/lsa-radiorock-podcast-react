/** @jsx React.DOM */
var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

var PodCastsItem = require('./PodCastsItem.jsx');
var PodCastsPlayer = require('./PodCastsPlayer.jsx');

var PodCastsStore = require('../stores/PodCastsStore');
var PodCastsPlayerActions = require('../actions/PodCastsPlayerActions');

var localItems = [];

// Method to retrieve state from Stores
module.exports = React.createClass({
  
  // Set the initial component state
  getInitialState: function(props) {
    props = props || this.props;

    // Set initial application state using props
    //console.log(this.props.items);

    /*if (ExecutionEnvironment.canUseDOM) {
      console.log("Tänne");
      window.addEventListener('scroll', this.handleScroll);
    }*/

    return{
      items: props.items,
      page: 0,
      loadingFlag:false
    };
  },

  // Add change listeners to stores
  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
    PodCastsStore.addChangeListener(this._onChange);

    this.setState({
      page: 0
    });
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    PodCastsStore.removeChangeListener(this._onChange);
  },

  handleScroll: function() {
    console.log("SCROLL ");
    //console.info(JSON.stringify(this.props.items));

    var windowHeight = $(window).height();
    var inHeight = window.innerHeight;
    var scrollT = $(window).scrollTop();
    var totalScrolled = scrollT+inHeight;

    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       console.log("near bottom!");
       console.log("Load new data!");
       console.log("page: " + this.state.page);
       this.state.page++;

        if(!this.state.loadingFlag){ //to avoid multiple request
          this.setState({
            loadingFlag:true,
          });

          $.ajax({
            url: "http://localhost:3000/api/podcasts/all?page=" + this.state.page,
            success: function(data) {
              localItems = this.state.items.concat(data);
              this.setState({items: localItems, loadingFlag : false});

              PodCastsPlayerActions.testText("TESTI TESTI!");


            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("Error loading new page!");
            }
          });
        }
    }
       
  },

  render: function() {
    var documentRows = "";
    var items;
    
    /*
    <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 test" >
      <div className="offer offer-danger">
        <div className="offer-header">
          <h3 className="lead">{this.parseDate(variant.date)}</h3>
        </div>
        <div className="play-button-container">
          <button onClick={this.playPodcast.bind(this,variant.filename)}>PLAY</button>
        </div>
        <div className="offer-content">
          <h4 className="offer-content">{variant.media.title}</h4>
        </div>
      </div>
    </div>
    */

    if(this.state.items){
      documentRows = this.state.items.map(function(variant, index) {
        return (<PodCastsItem data={variant} key={index} />)
      }, this);
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            {documentRows}
          </div>
        </div>
        <PodCastsPlayer/>
      </div>
    );
  },

  /*function getPagesState() {
    return {};
  },*/

  _onChange: function() {
    //this.setState();
    console.log("onchange PodCastsApp!");
    console.log(PodCastsStore.getCurrentPage());
    console.log(PodCastsStore.loadPodCasts());
  }
  
});