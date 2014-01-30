/** @jsx React.DOM */
var ComicListTable = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentWillMount: function() {
    Parse.initialize("uKoPYsEPCuxyfZT3M5lyTytsiyZij0RHCSY1VuZ4", "fEBQhKgD6Rw3NIBmjNvrc8SXHspGhucBEEVGh7cy");

    Parse.User.logIn("miken", "sprout77", {
      success: function(user) {
        console.log("Login succeeded");
      },
      error: function(user, error) {
        console.error("Login failed");
      }
    });

    var Comics = Parse.Object.extend("Comics");
    var query = new Parse.Query(Comics);
    query.ascending("comicName", "issue");
    query.find({
      success: function(results) {
        console.log(results.length);
        var object = results[0];
        console.log(object.get('comicName'));
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
      console.log(comic);
      return (<tr>
                <td>{comic.get('comicName')}</td>
                <td>{comic.get('issue')}</td>
                <td>{comic.get('writer')}</td>
                <td>{comic.get('publisher')}</td>
              </tr>);  
    });
    var tableContents = (
      <tbody>
        {comicRows}
      </tbody>
    );
    return tableContents;
  }
});

React.renderComponent(
  <ComicListTable />,
  document.getElementById('content')
);