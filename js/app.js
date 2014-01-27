/** @jsx React.DOM */
var ComicList = React.createClass({
  render: function() {
    var tableContents = (
      <tr><td>Green Lantern</td><td>1</td><td>Geoff Johns</td><td>DC Comics</td></tr>
    );
    return {tableContents};
  }
});

React.renderComponent(
  <ComicList />,
  document.getElementById('comiclist')
);