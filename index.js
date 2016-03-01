var express = require('express'),
    app     = express(),
    sqlite3 = require('sqlite3').verbose(),
    db      = new sqlite3.Database('mydb.db');

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/public'));

app.listen(port, ip);

db.serialize(function() {

  db.run("CREATE TABLE if not exists foosball_rules (rule TEXT)");
  var stmt = db.prepare("INSERT INTO foosball_rules VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, rule FROM foosball_rules", function(err, row) {
      console.log(row.id + ": " + row.rule);
  });
});

db.close();

