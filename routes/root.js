
module.exports = function(app, passport) {

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
          res.render('collect.ejs');
    });

    app.get('/collect2', function(req, res) {
          res.render('collect2.ejs');
    });

    app.get('/help', function(req, res) {
          res.render('help.ejs');
    });

    app.get('/setup', function(req, res) {
          res.render('setup.ejs');
    });
}