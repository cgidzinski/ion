// server.js

// set up ======================================================================

// get all the tools we need
var express  = require('express');
var app      = express();

var http = require('http').Server(app);

var port     = process.env.PORT || 8069; 

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var request = require('request');
var favicon = require('serve-favicon');

var diskspace = require('diskspace');

diskspace.check('/', function (err, total, free, status)
{
    console.log (total);
    console.log (free);
});

//var Gpio = require('onoff').Gpio, led = new Gpio(27, 'out');
//var wait = 1000;


//var iv = setInterval(function(){
//	led.writeSync(led.readSync() === 0 ? 1 : 0)
//}, 500);
 
// Stop blinking the LED and turn it off after 5 seconds.
//setTimeout(function() {
//    clearInterval(iv); // Stop blinking
//    led.writeSync(0);  // Turn LED off.
//    led.unexport();    // Unexport GPIO and free resources
//}, 5000);







 
// Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});
// configuration ===============================================================

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + '/public'));



// required for passport
app.use(favicon(__dirname + '/public/favicon.ico'));
// routes ======================================================================
require('./routes/root.js')(app,request);
require('./routes/404.js')(app);
// launch ======================================================================

http.listen(port);
console.log('The magic happens on port ' + port);