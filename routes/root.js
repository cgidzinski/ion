
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
var aqnumber = req.param("aqnumber");
if (aqnumber == undefined) {aqnumber = 10};

var inttime = req.param("inttime");
if (inttime == undefined) {inttime = 100};

var scanavg = req.param("scanavg");
if (scanavg == undefined) {scanavg = 5};

var boxcar = req.param("boxcar");
if (boxcar == undefined) {boxcar = 30};

var seqint = req.param("seqint");
if (seqint == undefined) {seqint = 2000};

var prefix = req.param("prefix");
if (prefix == undefined) {prefix = "IonTest_"};

              console.log("ALL SET");
                                res.render('collect.ejs',{
                                aqnumber : aqnumber,
                                inttime : inttime,
                                scanavg : scanavg,
                                boxcar : boxcar,
                                seqint  :seqint,
                                prefix  :prefix
                              });
    });


    app.get('/acquire', function(req, res) {
      var aqnumber = req.param("aqnumber");
      var seqint = req.param("seqint");
          res.render('acquire.ejs',{
                                aqnumber : aqnumber,
                                seqint : seqint,});
    });

 


 app.get('/results', function(req, res) {
var wavelengthdata;
var spectrumdata;





request('http://192.168.42.1/cgi-bin/getwavelengths.php',{timeout: 1500}, function (error, response, body) {
   if (!error && response.statusCode == 200) {                            
    var wavelengthdata = body.split(" ");
//gettectemperature
              request('http://192.168.42.1/cgi-bin/currentspectrum.php',{timeout: 1500}, function (error, response, body) {
                 if (!error && response.statusCode == 200) {
                  var spectrumdata = body.split(" ");

                console.log("ALL SET");
                                  res.render('results.ejs',{
                                  wavelength : wavelengthdata,
                                  spectrum: spectrumdata
                                  });

                }
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

}


//<a class="uk-button uk-button-danger uk-button-large" href="http://192.168.42.1/cgi-bin/startsequence.php">Acquire</a>