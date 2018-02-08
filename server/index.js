var express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const MmbsServer = require('./lib/mmbs-server').MmbsServer;
const MmbsDashboard = require('./dashboard/app');
const config = require('./config/config');
var path = require('path');


var dashboard = new MmbsDashboard(config.dashboard, {
  allowInsecureHTTP: true
});
var api = new MmbsServer(config.mmbsServer);

var app = express();

if (config.useMorgan) {
  app.use(morgan(config.useMorgan)); // enable the log when the client requesting something to web. combined short dev common
}
app.use(cors()); // allow client to access the server
// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));


app.use(config.urlServerPath, api);
app.use(config.urlDashboardPath, dashboard);

app.get('/', function (req, res) {
  res.status(200).send('Mmbs Server Is Running');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});


var port = process.env.PORT || config.port;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('mmbs-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
MmbsServer.createLiveQueryServer(httpServer);

httpServer.on('error', function (err) {
  console.log(err);
});