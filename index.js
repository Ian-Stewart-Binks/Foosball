var express = require('express'),
    app     = express();

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/data'));

app.listen(port, ip);

