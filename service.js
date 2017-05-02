
var express = require('express');
var routes = require('./routes');
var http = require('http');
var bodyParser = require("body-parser");

var app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));
app.use("/node_modules", express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.init(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
