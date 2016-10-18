
// intialize settings storage variables

    

settingsHold = {aqnumber:"5", inttime:"5", scanavg:"3", boxcar:"3", seqint:"5", prefix:"5"};


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

    app.get('/install12', function(req, res) {
    
    
           
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

    app.get('/setup_change', function(req, res) {
    
    // SET INITIAL DEFAULT VALUES HERE
     
   
    
    // INPUT DEFAULT VALUES HERE
   


        var aqnumber = req.param("aqnumber");
        if (aqnumber == undefined){ aqnumber = 5;
        }
        else if (aqnumber != settingsHold.aqnumber){
          settingsHold.aqnumber = aqnumber;
        }

        var inttime = req.param("inttime");
        if (inttime == undefined){inttime = 10;
        }
        else if (inttime != settingsHold.inttime){
          settingsHold.inttime = inttime;
        }
        

        var scanavg = req.param("scanavg");
        if (scanavg == undefined){scanavg = 5;
        }
        else  if (scanavg != settingsHold.scanavg){
          settingsHold.scanavg = scanavg;
        }

        var boxcar = req.param("boxcar");
        if (boxcar == undefined){boxcar = 30;
        }
        else if (boxcar != settingsHold.boxcar){
          settingsHold.scanavg = scanavg;
        }

        var seqint = req.param("seqint");
        if (seqint == undefined){seqint = 10;}
        else if (seqint != settingsHold.seqint){
          settingsHold.seqint = seqint;
        }
        
        var prefix = req.param("prefix");
        if (prefix == undefined){prefix='test'
        }
        else if (prefix != settingsHold.prefix){
          settingsHold.prefix = prefix
        }

      console.log("ALL SET");
                                res.render('setup_change.ejs',{
                                
                                aqnumber : aqnumber,
                                inttime : inttime,
                                scanavg : scanavg,
                                boxcar : boxcar,
                                seqint  : seqint,
                                prefix  : prefix
                              
                              });



              
          
    });
    

}


//<a class="uk-button uk-button-danger uk-button-large" href="http://192.168.42.1/cgi-bin/startsequence.php">Acquire</a>

