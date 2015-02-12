var React = require('react');

var Content = React.createClass({
  render: function() {
    return (
      <div><h1>Hello, world!</h1></div>
    );
  }
});
React.render(
  <Content />,
  document.getElementById('content')
);
