// intialize settings storage variables



module.exports = function(app, request,Gpio,fs,pr) {
               var led = new Gpio(27, 'out');
               var timer;
               var readCount = 0;
        // =============================================================================
        // ROOT ========================================================================
        // =============================================================================
        app.get('/', function(req, res) {
           

                res.render('/home/ion/views/welcome.ejs',{
                });


          
        });

        app.get('/dashboard', function(req, res) {
            res.render('/home/ion/views/dashboard.ejs');
        });

        app.get('/install01', function(req, res) {
            res.render('/home/ion/views/install01.ejs');
        });
        app.get('/install02', function(req, res) {
            res.render('/home/ion/views/install02.ejs');
        });
        app.get('/install03', function(req, res) {
            res.render('/home/ion/views/install03.ejs');
        });
        app.get('/install04', function(req, res) {
            res.render('/home/ion/views/install04.ejs');
        });
        app.get('/install05', function(req, res) {
            res.render('/home/ion/views/install05.ejs');
        });
        app.get('/install06', function(req, res) {
            res.render('/home/ion/views/install06.ejs');
        });
        app.get('/install07', function(req, res) {
            res.render('/home/ion/views/install07.ejs');
        });
        app.get('/install08', function(req, res) {
            res.render('/home/ion/views/install08.ejs');
        });
        app.get('/install09', function(req, res) {
            res.render('/home/ion/views/install09.ejs');
        });
        app.get('/install10', function(req, res) {
            res.render('/home/ion/views/install10.ejs');
        });
        app.get('/install11', function(req, res) {
            res.render('/home/ion/views/install11.ejs');
        });
        app.get('/install12', function(req, res) {
            res.render('/home/ion/views/install12.ejs');
        });
        app.get('/installFin', function(req, res) {
            res.render('/home/ion/views/installFin.ejs');
        });
        app.get('/fibreTest', function(req, res) {
            res.render('/home/ion/views/fibreTest.ejs');
        });
        app.get('/collectRefr', function(req, res) {
            res.render('/home/ion/views/collectRefr.ejs');
        });
        app.get('/collectDark', function(req, res) {
            console.log(req.query.folderName);
            

            // CREATE A NEW DIRECTORY FOR THE NEXT ACQUISITION SEQUENCE
            fs.mkdir('/home/ocean/'+ req.query.folderName);
            fs.chmod('/home/ocean/'+ req.query.folderName, '777');
            process.chdir("/home/ion/");


            // RESTART SPECTRA NUMBERING FOR THE NEW COLLECTION SERIES
            readCount = 0;
          

            res.render('/home/ion/views/collectDark.ejs',{
                });

        });
        app.get('/collectData', function(req, res) {
            res.render('/home/ion/views/collectData.ejs');
        });
        app.get('/collectTest', function(req, res) {
            res.render('/home/ion/views/collectTest.ejs');
        });
        app.get('/acquireRefr', function(req, res) {
            console.log(req.query.intTime);
            console.log(req.query.seqInt);
            console.log(req.query.aqNumber);
            console.log(req.query.scanAvg);

            // GET INTERVAL TIME
            var intTime =   req.query.intTime/1000;
            var scans = req.query.scanAvg;

            var delay;    
            
            delay = setTimeout(function(){flasher();}, 2500);

            flasher = function(){
            
                led.writeSync(1);   
                setTimeout(function(){led.writeSync(0);}, (intTime*scans)+2000); 
            }

            
            res.render('/home/ion/views/acquireRefr.ejs',{});
            
            
            
        });
        
        app.get('/acquireDark', function(req, res) {
            res.render('/home/ion/views/acquireDark.ejs');
        });
        app.get('/acquireData', function(req, res) {
            console.log(req.query.intTime);
            console.log(req.query.seqInt);
            console.log(req.query.aqNumber);
            console.log(req.query.scanAvg);

            // GET INTERVAL TIME
            var readInt = req.query.seqInt;
            var intTime =   req.query.intTime/1000;
            var aqNumber = req.query.aqNumber;
            var scans = req.query.scanAvg;

            var time = aqNumber * (readInt);
            var delay;    
            

            delay = setTimeout(function(){pulser();}, 1500);

            pulser = function(){
            timer = setInterval(function(){blinker();}, readInt-50);    
            }

            

            blinker = function(){
            if ( time <= 0)
            {
                //stop timer
                clearInterval(timer);
            }
            else
            {
                time = time - readInt;
                led.writeSync(1);   
                setTimeout(function(){led.writeSync(0);}, (intTime*scans)+1000); 
            }}

            res.render('/home/ion/views/acquireData.ejs', {});

            //led.unexport(); 
            
            
            

        });
        app.get('/acquireTest', function(req, res) {
            console.log(req.query.intTime);
            console.log(req.query.seqInt);
            console.log(req.query.aqNumber);
            console.log(req.query.scanAvg);

            // GET INTERVAL TIME
            var intTime =   req.query.intTime/1000;
            var scans = req.query.scanAvg;

            var delay;    
            
            delay = setTimeout(function(){flasher();}, 2500);

            flasher = function(){
            
                led.writeSync(1);   
                setTimeout(function(){led.writeSync(0);}, (intTime*scans)+2000); 
            }

            
            res.render('/home/ion/views/acquireTest.ejs');
        });
        app.get('/acquireFire', function(req, res) {
            console.log(req.query.intTime);
            console.log(req.query.seqInt);
            console.log(req.query.aqNumber);
            console.log(req.query.scanAvg);

            // GET INTERVAL TIME
            var intTime =   req.query.intTime/1000;
            var scans = req.query.scanAvg;

            var delay;    
            
            delay = setTimeout(function(){flasher();}, 2500);

            flasher = function(){
            
                led.writeSync(1);   
                setTimeout(function(){led.writeSync(0);}, (intTime*scans)+2000); 
            }

            
            res.render('/home/ion/views/acquireFire.ejs');
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
                            res.render('/home/ion/views/resultsDark.ejs', {
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

            // var currentDir = '/home/ocean/'+ req.query.folderName + '/';
            // console.log(currentDir);

            // fs.readdir(currentDir, function(err, files) {
            //     if (err) return;
            //         files.forEach(function(f) {
            //         console.log('Files: ' + f);
            //         var fileClean = f.replace(/["]/g, "");
            //         console.log(fileClean);
            //         var oldName = currentDir+f;
            //         var newName = currentDir+fileClean;
            //         console.log(oldName);
            //         console.log(newName);

            //         fs.renameSync(currentDir+f, currentDir+fileClean);
                        
            //     });
            // });


            request('http://192.168.42.1/cgi-bin/getwavelengths.php', { timeout: 1500 }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var wavelengthdata = body.split(" ");
                    //gettectemperature
                    request('http://192.168.42.1/cgi-bin/currentspectrum.php', { timeout: 1500 }, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var spectrumdata = body.split(" ");
                            console.log("ALL SET");
                            res.render('/home/ion/views/resultsRefr.ejs', {
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
            
            var currentDir = '/home/ocean/'+ req.query.folderName + '/';
            console.log(currentDir);

            fs.readdir(currentDir, function(err, files) {
                if (err) return;
                    files.forEach(function(f) {
                    console.log('Files: ' + f);
                    var fileClean = f.replace(/["]/g, "");
                    console.log(fileClean);

                    var oldName = currentDir+f;
                    var newName;

                    if (fileClean.indexOf("DARK") != -1) {
     
                    newName = currentDir+fileClean;

                    } else if (fileClean.indexOf("REFR") != -1) {

                    newName = currentDir+fileClean;    

                    } else if (fileClean.indexOf("COUNT") != -1) {

                    newName = currentDir+fileClean;    

                    } else {

                        var numPad = String (readCount);
                        if (numPad.length < 2){ numPad = '00' + numPad;}
                        if (numPad.length < 3){ numPad = '0' + numPad;}

                        newName =  currentDir+"COUNT_" + numPad + "_" + fileClean;
                        readCount = readCount + 1;
                    }

                   
                    console.log(oldName);
                    console.log(newName);

                    fs.renameSync(oldName, newName);
                    
                        
                });
            });    



            request('http://192.168.42.1/cgi-bin/getwavelengths.php', { timeout: 1500 }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var wavelengthdata = body.split(" ");
                    //gettectemperature
                    request('http://192.168.42.1/cgi-bin/currentspectrum.php', { timeout: 1500 }, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var spectrumdata = body.split(" ");
                            console.log("ALL SET");
                            res.render('/home/ion/views/resultsData.ejs', {
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
                            res.render('/home/ion/views/resultsTest.ejs', {
                                wavelength: wavelengthdata,
                                spectrum: spectrumdata
                            });
                        }
                    });
                }
            });
        });
        app.get('/resultsFire', function(req, res) {
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
                            res.render('/home/ion/views/resultsFire.ejs', {
                                wavelength: wavelengthdata,
                                spectrum: spectrumdata
                            });
                        }
                    });
                }
            });
        });
        app.get('/help', function(req, res) {
            res.render('/home/ion/views/help.ejs');
        });
        app.get('/setup_change', function(req, res) {
            res.render('/home/ion/views/setup_change.ejs');
        });
         app.get('/stop', function(req, res) {
           // var timer 
            // var led = Gpio(27, 'out');
            // led.unexport();
            clearInterval(timer);

            res.render('/home/ion/views/stop.ejs');
        });
        app.get('/shutdown', function(req, res) {
            res.render('/home/ion/views/shutdown.ejs');
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