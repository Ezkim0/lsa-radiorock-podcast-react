/** @jsx React.DOM */
var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

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
      items: {},
      page:0,
      loadingFlag:false,
      url:"loadComment.php"
    };
  },

  // Add change listeners to stores
  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    
  },

  handleScroll: function() {
    console.log("SCROLL ");
    //console.info(JSON.stringify(this.props.items));

    var windowHeight = $(window).height();
    var inHeight = window.innerHeight;
    var scrollT = $(window).scrollTop();
    var totalScrolled = scrollT+inHeight;

    /*
    console.log("windowHeight: " + windowHeight);
    console.log("inHeight: " + inHeight);
    console.log("scrollT: " + scrollT);
    console.log("totalScrolled: " + totalScrolled);
    console.log("loadingFlag " + this.state.loadingFlag);
    */
    

    //console.log("... " + totalScrolled);
    //console.log("... " + this.state.loadingFlag);

    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       alert("near bottom!");
    }

    /*if(totalScrolled+100>windowHeight){ //user reached at bottom
      if(!this.state.loadingFlag){ //to avoid multiple request
        this.setState({
          loadingFlag:true,
        });
      }
    }*/
  },

  render: function() {
    var documentRows = "";

    /*if (this.props.items) {
      documentRows = this.props.items.map(function(variant, index) {
        return (
          <tr key={index} height="200px">
            <td>{variant.media.title}</td>
            <td>{variant.media.description}</td>
            <td>TEST</td>
            <td>TEST</td>
          </tr>
        )
      }, this);
    }*/

    if (this.props.items) {
      documentRows = this.props.items.map(function(variant, index) {
        return (
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="offer offer-danger">
              <div className="offer-header">
                <h3 className="lead">{variant.media.title}</h3>
              </div>
              <div className="offer-player">
              </div>
              <div className="offer-content">
                <h4 className="offer-content">{variant.media.description}</h4>
              </div>
            </div>
          </div>
        )
      }, this);
    }
 
    /*return (
      <div>
        <h1>React Test: {this.props.name}</h1>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>TEST</th>
              <th>TEST</th>
            </tr>
          </thead>
          <tbody>
            {documentRows}
          </tbody>            
      </table>
      </div>
    );*/

    
    /*.container
      .row
        .col-lg-12.tag-holder
          button.tag-button.center-block(type="button") Korporaatio
      .row
        .col-xs-12.col-sm-6.col-md-4.col-lg-3(ng-repeat="post in reverse(posts)", my-post-repeat-directive)
          .offer.offer-danger
            .shape(ng-show="showNewBadge(post.date)")
              .shape-text
                | new
            .offer-header
              h3.lead(ng-bind="parseDate(post.date)")
            .offer-player
              audio(controls, preload="none")
                source(ng-src="{{getAudioPath(post.filename)}}", type="audio/mpeg")
            .offer-content
              h4(ng-bind="post.media.title")
  */

    /*return (
      <div>
        <h1>React Test: {this.props.name}</h1>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>TEST</th>
              <th>TEST</th>
            </tr>
          </thead>
          <tbody>
            {documentRows}
          </tbody>            
      </table>
      </div>
    );*/

    return (
      <div className="container">
        <div className="row">
          {documentRows}
        </div>
      </div>
    );


  }
  
});