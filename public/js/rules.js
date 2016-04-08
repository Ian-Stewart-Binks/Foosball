var Rule = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        contents: React.PropTypes.object.isRequired,
        id: React.PropTypes.string.isRequired
    },
    render: function() {
        var contentNodes = this.props.contents.map(function(c) {
            return (
                // Get raw data so any html formatting in the model isn't lost.
                // eslint-disable-next-line react/no-danger
                <li dangerouslySetInnerHTML={{__html:c.toString()}} />
            );
        });
        return (
            <div className="panel panel-default">
                <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" href={'#' + this.props.id}>
                    <h4 className="panel-title">
                        <a> {this.props.name} </a>
                    </h4>
                </div>
                <div id={this.props.id} className="panel-collapse collapse">
                    <div className="panel-body">
                        <ul>
                            {contentNodes}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

var RuleList = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired
    },
    render: function() {
        var ruleNodes = this.props.data.map(function(r, i) {
            return (
                <Rule name={r.name} contents={r.contents} id={i} />
            );
        });
        return (
            <div className="panel-group" id="accordion">
                {ruleNodes}
            </div>
        );
    }
});

var RuleContainer = React.createClass({
    propTypes: {
        url: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div>
                <RuleList data={this.state.data} />
            </div>
        );
    }
});

ReactDOM.render(
    <RuleContainer url="rules.json" />,
    document.getElementById('rules')
);
