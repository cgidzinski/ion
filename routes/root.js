
module.exports = function(app, request) {

    // =============================================================================
    // ROOT ========================================================================
    // =============================================================================


    app.get('/', function(req, res) {
          res.render('dashboard.ejs');
    });

    app.get('/install', function(req, res) {
          res.render('install.ejs');
    });

    app.get('/install2', function(req, res) {
          res.render('install2.ejs');
    });

 	app.get('/install3', function(req, res) {
          res.render('install3.ejs'); 
    });

 	app.get('/install4', function(req, res) {
          res.render('install4.ejs'); 
    });

     	app.get('/install_fin', function(req, res) {
          res.render('install_fin.ejs'); 
    });

    app.get('/collect', function(req, res) {
          res.render('collect_basic.ejs');
    });

    app.get('/collectadj', function(req, res) {
var aqnumber = req.param("aqnumber");
if (aqnumber == undefined) {aqnumber = 10};

var inttime = req.param("inttime");
if (inttime == undefined) {inttime = 100};

var scanavg = req.param("scanavg");
if (scanavg == undefined) {scanavg = 5};

var boxcar = req.param("boxcar");
if (boxcar == undefined) {boxcar = 30};

        request('http://www.google.com', function (error, response, body) {
           if (!error && response.statusCode == 200) {
                console.log(data); // Print the google web page.

                  res.render('collect_adj.ejs',{
                  aqnumber : req.param("aqnumber"),
                  inttime : inttime,
                  scanavg : scanavg,
                  boxcar : boxcar,
                  data : data
                  });
           }
        });
    });





    app.get('/help', function(req, res) {
          res.render('help.ejs');
    });

    app.get('/setup', function(req, res) {
          res.render('setup.ejs');
    });

    var data = "SOME DATA"
}