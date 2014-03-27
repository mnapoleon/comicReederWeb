/** @jsx React.DOM */
var ComicListTable = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentWillMount: function() {
    Parse.initialize("uKoPYsEPCuxyfZT3M5lyTytsiyZij0RHCSY1VuZ4", "fEBQhKgD6Rw3NIBmjNvrc8SXHspGhucBEEVGh7cy");
    Parse.User.logIn("miken", "evan101110", {
      success: function(user) {
        console.log("Login succeeded");
      },
      error: function(user, error) {
        console.error("Login failed");
        alert("Login failed!!!");
      }
    });

    var Comics = Parse.Object.extend("Comics");
    var query = new Parse.Query(Comics);
    query.ascending("comicName", "issue");
    query.find({
      success: function(results) {
        var object = results[0];
        this.setState({data: results});
      }.bind(this),
      error: function(error) {
        console.error("query.find failed");
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Comic</th>
              <th>Issue #</th>
              <th>Writer</th>
              <th>Publisher</th>
            </tr>
          </thead>
          <ComicList data={this.state.data} />
        </table>
      </div>);
  }
});

var ComicList = React.createClass({
  render: function() {
    var comicRows = this.props.data.map(function (comic) {
      return (<ComicRow comic={comic} />);  
    });
    var tableContents = (
      <tbody>
        {comicRows}
      </tbody>
    );
    return tableContents;
  }
});

var ComicRow = React.createClass({
  getInitialState: function() {
    return {comic: {}};
  },

  handleClick: function(event) {
    alert("Comic was clicked on");
  },

  render: function() {
    return (<tr onClick={this.handleClick}>
              <td><img src={this.props.comic.get('smallIconUrl')}/></td>
              <td>{this.props.comic.get('comicName')}</td>
              <td>{this.props.comic.get('issue')}</td>
              <td>{this.props.comic.get('writer')}</td>
              <td>{this.props.comic.get('publisher')}</td>
            </tr>);  
  }
});

var ComicInfo = React.createClass({
  getInitialState: function() {
    return {comicInfo: {}};
  },

  render: function() {
    return (<div>
        <img src={this.props.comicInfo.get('smallIconUrl')}/>
        <h2>{this.props.comicInfo.get('comicName')}</h2>
        <h3>{this.props.comicInfo.get('issue')}</h3>
        <h3>{this.props.comicInfo.get('writer')}</h3>
        <h3>{this.props.comicInfo.get('publisher')}</h3>
        </div>
    );
  }
});

React.renderComponent(
  <div>
    <ComicListTable />
  </div>,
  document.getElementById('content')
);