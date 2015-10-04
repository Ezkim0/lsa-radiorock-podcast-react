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

    if (ExecutionEnvironment.canUseDOM) {
      console.log("Tänne");
      window.addEventListener('scroll', this.handleScroll);
    }

    return{
      items: {},
      page:0,
      loadingFlag:false,
      url:"loadComment.php"
    };
  },

  // Add change listeners to stores
  componentDidMount: function() {
    
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

    console.log("... " + totalScrolled);
    console.log("... " + this.state.loadingFlag);

    if(totalScrolled+100>windowHeight){ //user reached at bottom
      if(!this.state.loadingFlag){ //to avoid multiple request
        this.setState({
          loadingFlag:true,
        });
      }
    }
  },

  render: function() {
    var documentRows = "";

    if (this.props.items) {
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
    }

    return (
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
    );
  }
  
});