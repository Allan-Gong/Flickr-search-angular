var gzippo = require('gzippo');

var express = require('express');
var app = express();

app.use(gzippo.staticGzip(__dirname + "/dist"));
app.use(function(req, res){
  res.sendFile(__dirname + "/dist/index.html");
});

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Express is listening on port ' + server.address().port)
});