var http    = require('http');
    express = require('express'),
    app     = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.use(express.static(__dirname + '/public'));

app.listen(PORT);

