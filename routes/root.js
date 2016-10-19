// intialize settings storage variables
settingsHold = { aqnumber: "5", inttime: "5", scanavg: "3", boxcar: "3", seqint: "5", prefix: "5" };
module.exports = function(app, request) {
        // =============================================================================
        // ROOT ========================================================================
        // =============================================================================
        app.get('/', function(req, res) {
            res.render('dashboard.ejs');
        });
        app.get('/install01', function(req, res) {
            res.render('install01.ejs');
        });
        app.get('/install02', function(req, res) {
            res.render('install02.ejs');
        });
        app.get('/install03', function(req, res) {
            res.render('install03.ejs');
        });
        app.get('/install04', function(req, res) {
            res.render('install04.ejs');
        });
        app.get('/install05', function(req, res) {
            res.render('install05.ejs');
        });
        app.get('/install06', function(req, res) {
            res.render('install06.ejs');
        });
        app.get('/install07', function(req, res) {
            res.render('install07.ejs');
        });
        app.get('/install08', function(req, res) {
            res.render('install08.ejs');
        });
        app.get('/install09', function(req, res) {
            res.render('install09.ejs');
        });
        app.get('/install10', function(req, res) {
            res.render('install10.ejs');
        });
        app.get('/install11', function(req, res) {
            res.render('install11.ejs');
        });
        app.get('/collect', function(req, res) {
            res.render('collect.ejs');
        });
        app.get('/acquire', function(req, res) {
            res.render('acquire.ejs');
        });
        app.get('/results', function(req, res) {
            var wavelengthdata;
            var spectrumdata;
            request('http://192.168.42.1/cgi-bin/getwavelengths.php', { timeout: 1500 }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var wavelengthdata = body.split(" ");
                    //gettectemperature
                    request('http://192.168.42.1/cgi-bin/currentspectrum.php', { timeout: 1500 }, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var spectrumdata = body.split(" ");
                            console.log("ALL SET");
                            res.render('results.ejs', {
                                wavelength: wavelengthdata,
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
        app.get('/setup_change', function(req, res) {
            res.render('setup_change.ejs');
        });







    }
    //<a class="uk-button uk-button-danger uk-button-large" href="http://192.168.42.1/cgi-bin/startsequence.php">Acquire</a>

  
 //    <iframe src='http://192.168.42.1/cgi-bin/setmaxacquisitions.php?acquisitions=<%= aqnumber %>' height="0" width="0"></iframe>
 //    <iframe src='http://192.168.42.1/cgi-bin/setintegration.php?time=<%= inttime %>' height="0" width="0"></iframe>
 //    <iframe src='http://192.168.42.1/cgi-bin/setaverage.php?scans=<%= scanavg %>' height="0" width="0"></iframe>
 //    <iframe src='http://192.168.42.1/cgi-bin/setboxcar.php?width=<%= boxcar %>' height="0" width="0"></iframe>
 //    <iframe src='http://192.168.42.1/cgi-bin/setsequenceinterval.php?interval=<%= seqint %>' height="0" width="0"></iframe>
 //    <iframe src='http://192.168.42.1/cgi-bin/setprefix.php?prefix=<%= prefix %>' height="0" width="0"></iframe>
 //    <iframe src='http://192.168.42.1/cgi-bin/setsavelocation.php?location=/home/ocean'height="0" width="0"></iframe>
 // 