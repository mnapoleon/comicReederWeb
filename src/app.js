/** @jsx React.DOM */
var ComicList = React.createClass({
  getInitialState: function() {
    return {data: []};  
  },
  
  componentWillMount: function() {
    $.ajax({
      url: 'comics.json',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});  
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("comics.json", status, err.toString());
      }.bind(this)
    });  
  },
  
  render: function() {
    console.log(this.props.data);
    var comicRows = this.props.data.map(function (comic) {
      return <tr><td>{comic.comic_name}</td><td>{comic.issue_number}</td><td>{comic.writer}</td><td>{comic.publisher}</td></tr>;  
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
  <ComicList />,
  document.getElementById('comiclist')
);