var headerId = "foosball-header"

var headerStyle = {
  textAlign: 'center'
};

var Header = React.createClass({
    render: function() {
        return (
            <h1 id={headerId} style={headerStyle} className="bg-primary">Foosball</h1>
        );
    }
});

ReactDOM.render(
    <Header />,
    document.getElementById('header')
);

d3.select("#" + headerId).style("opacity", 0).transition().duration(1000).style("opacity", 1);
