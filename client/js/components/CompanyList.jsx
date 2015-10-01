/** @jsx React.DOM */

var React = require('react');
var moment = require('moment');

var ViewFactory = require('./ViewFactory.jsx');
var CompanyStore = require('../stores/CompanyStore');
var CompanyActions = require('../actions/CompanyActions');

var externalView = null;

// Method to retrieve state from Stores
function getState() {
  return {
    companies: CompanyStore.getCompanies() || [],
    externalView: externalView
  };
}

module.exports = React.createClass({
  
  // Set the initial component state
  getInitialState: function(props) {
    props = props || this.props;

    // Set initial application state using props
    return {
      companies: props.companies
    };
  },

  // Add change listeners to stores
  componentDidMount: function() {
    CompanyStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    CompanyStore.removeChangeListener(this._onChange);
  },

  handleCompanyClick: function(company, event) {
    window.location.href = '/companies/' + company._id;
  },

  formatTime: function(time) {
    return moment(time).fromNow();
  },

  getViewHandlers: function() {
    return {
      createCompany:this.createCompany, 
      closeView:this.closeView
    }
  },

  render: function() {
    var companyRows = "";
    var companyListClassName = "company-list";

    if (externalView) {
      companyListClassName += " hidden";
    }        

    if (this.state.companies) {
      companyRows = this.state.companies.map(function(variant, index) {
        return (
          <tr key={index} onClick={this.handleCompanyClick.bind(this, variant)}>
            <td><a href={"/companies/" + variant._id}>{variant.name}</a></td>
            <td>{this.formatTime(variant.created)}</td>
            <td>{this.formatTime(variant.modified)}</td>
            <td><a href={"/companies/" + variant._id + "/remove"}>Remove</a></td>
          </tr>
        )
      }, this);      
    }
    
    return (
      <div>

        <ViewFactory data={this.state.externalView} handlers={this.getViewHandlers()} />

        <div className={companyListClassName}>

          <div className="row action-bar">
            <div className="col-sm-6">
              <a className="btn btn-primary" onClick={this.openCreateCompanyDialog} ><i className="fa fa-plus" /> Create New Company</a>
            </div>
          </div>  

          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>Companies</h5>
                    <div className="ibox-tools">
                      
                    </div>
                </div>  
                <div className="ibox-content">
                
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Modified</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyRows}
                    </tbody>            
                  </table>              

                </div>  
              </div>  
            </div>  
          </div>
        </div>

      </div>
    );
  },

  closeView: function() {
    externalView = null;
    this.setState(getState());
  },

  openCreateCompanyDialog: function(element) {
    externalView = {type: 'create-company-dialog'};
    this.setState(getState());
  },

  createCompany: function(com) {
    if (!com) { return; }
    CompanyActions.createCompany(com);
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getState());
  }
  
});