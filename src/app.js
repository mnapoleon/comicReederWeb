/** @jsx React.DOM */
var ComicListTable = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentWillMount: function() {
    $.ajax({
      url: 'comics.json',
      dataType: 'json',
      success: function(data) {
        console.log("comics.json was loaded successfully")
        this.setState({data: data});  
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("comics.json", status, err.toString());
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
      return (<tr>
                <td>{comic.comic_name}</td>
                <td>{comic.issue_number}</td>
                <td>{comic.writer}</td>
                <td>{comic.publisher}</td>
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