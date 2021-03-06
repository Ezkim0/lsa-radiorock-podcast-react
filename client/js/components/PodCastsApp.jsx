/** @jsx React.DOM */
var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

var PodCastsItem = require('./PodCastsItem.jsx');
var PodCastsPlayer = require('./PodCastsPlayer.jsx');

var PodCastsStore = require('../stores/PodCastsStore');
var PodCastsPlayerActions = require('../actions/PodCastsPlayerActions');


function getPodCastsState() {
  return {
    items: PodCastsStore.getPodCasts(),
    page: PodCastsStore.getCurrentPage(),
    loadingFlag:false
  };
}

module.exports = React.createClass({
  
  getInitialState: function(props) {
    props = props || this.props;

    if(props.items) {
      PodCastsStore.setDefaultPodcasts(props.items);
    }

    return{
      items: props.items,
      page: 0,
      loadingFlag:false
    };
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
    PodCastsStore.addChangeListener(this._onChange);

    this.setState({
      page: 0
    });
  },

  componentWillUnmount: function() {
    PodCastsStore.removeChangeListener(this._onChange);
  },

  handleScroll: function() {
    var windowHeight = $(window).height();
    var inHeight = window.innerHeight;
    var scrollT = $(window).scrollTop();
    var totalScrolled = scrollT+inHeight;

    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       this.state.page++;

        if(!this.state.loadingFlag){ 
          this.setState({
            loadingFlag:true,
          });
          PodCastsPlayerActions.loadPodCasts(PodCastsStore.getNextPage());
        }
    }
       
  },

  render: function() {
    var documentRows = "";
    var items;

    if(this.state.items){
      documentRows = this.state.items.map(function(variant, index) {
        return (<PodCastsItem data={variant} key={index} />)
      }, this);
    }

    var loader;
    if(this.state.loadingFlag){
      loader = <div className="loaderAnimaton">
          <img src="images/assets/loader.gif" className="loaderImage"/>
        </div>;
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            {documentRows}
          </div>
        </div>
        <PodCastsPlayer/>
        {loader}
      </div>
    );
  },

  _onChange: function() {
    console.log("...._onChange PodcastsApp");
    this.setState(getPodCastsState());
  }
  
});