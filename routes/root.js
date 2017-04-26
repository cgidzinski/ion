// intialize settings storage variables

module.exports = function(app, request,diskspace,Gpio) {
        // =============================================================================
        // ROOT ========================================================================
        // =============================================================================
        app.get('/', function(req, res) {
           
           diskspace.check('/', function (err, result)
            {
            res.render('dashboard.ejs',{
            mTotal: result.total,
            mFree: result.free
            })


        })






        });
        app.get('/welcome', function(req, res) {
            res.render('welcome.ejs');
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
        app.get('/install12', function(req, res) {
            res.render('install12.ejs');
        });
        app.get('/installFin', function(req, res) {
            res.render('installFin.ejs');
        });
        app.get('/collectRefr', function(req, res) {
            res.render('collectRefr.ejs');
        });
        app.get('/collectDark', function(req, res) {
            res.render('collectDark.ejs');
        });
        app.get('/collectData', function(req, res) {
            res.render('collectData.ejs');
        });
        app.get('/collectTest', function(req, res) {
            res.render('collectTest.ejs');
        });
        app.get('/acquireRefr', function(req, res) {
        
            led = new Gpio(27, 'out');
            
            led.writeSync(1);   
            setTimeout(function(){led.writeSync(0);}, 5000);


            // // led.unexport(); 
            res.render('acquireRefr.ejs');
            
  
            
        });
        
        app.get('/acquireDark', function(req, res) {
            res.render('acquireDark.ejs');
        });
        app.get('/acquireData', function(req, res) {

            
            // GET INTERVAL TIME
            var readInt = 10000;
            var intTime = 100;
            // var aqNumber;
            timer;
            var time = 50000;


            // SET UP LED FOR BLINK
            led = new Gpio(27, 'out');

            led.writeSync(1);   
            setTimeout(function(){led.writeSync(0);}, intTime); 

            timer = setInterval(function(){blinker();}, readInt);

            blinker = function(){
            if ( time <= 0)
            {
                // close LED output and stop timer
                led.unexport();
                clearInterval(timer);
            }
            else
            {
                time = time - readInt;
                led.writeSync(1);   
                setTimeout(function(){led.writeSync(0);}, intTime); 
            }}

            res.render('acquireData.ejs', {});

            // led.unexport(); 
            
            
            

        });
        app.get('/acquireTest', function(req, res) {
            res.render('acquireTest.ejs');
        });
        app.get('/resultsDark', function(req, res) {
            var wavelengthdata;
            var spectrumdata;
            request('http://192.168.42.1/cgi-bin/getwavelengths.php', { timeout: 1500 }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var wavelengthdata = body.split(" ");
            
                    request('http://192.168.42.1/cgi-bin/currentspectrum.php', { timeout: 1500 }, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var spectrumdata = body.split(" ");
                            console.log("ALL SET");
                            res.render('resultsDark.ejs', {
                                wavelength: wavelengthdata,
                                spectrum: spectrumdata
                            });
                        }
                    });
                }
            });
        });
        app.get('/resultsRefr', function(req, res) {
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
                            res.render('resultsRefr.ejs', {
                                wavelength: wavelengthdata,
                                spectrum: spectrumdata
                            });
                        }
                    });
                }
            });
        });
        app.get('/resultsData', function(req, res) {
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
                            res.render('resultsData.ejs', {
                                wavelength: wavelengthdata,
                                spectrum: spectrumdata
                            });
                        }
                    });
                }
            });
        });
        app.get('/resultsTest', function(req, res) {
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
                            res.render('resultsTest.ejs', {
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
         app.get('/stop', function(req, res) {
            var timer = setInterval(function(){blinker();}, readInt);
            var led = new Gpio(27, 'out');
            led.unexport();
            clearInterval(timer);

            res.render('stop.ejs');
        });
        app.get('/shutdown', function(req, res) {
            res.render('shutdown.ejs');
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