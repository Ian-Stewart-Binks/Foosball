var headerId = "foosball-header"

var headerStyle = {
  textAlign: 'center'
};

var Header = React.createClass({
    render: function() {
        return (
          <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Foosball</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="/"> Home <span className="sr-only">(current)</span></a></li>
              <li><a href="/foosball_rules.html"> Rules </a></li>
            </ul>
          </div>
        </div>
      </nav>
        );
    }
});

ReactDOM.render(
    <Header />,
    document.getElementById('header')
);

d3.select("#" + headerId).style("opacity", 0).transition().duration(1000).style("opacity", 1);
