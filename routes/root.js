
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

    app.get('/collect', function(req, res) {
          res.render('collect.ejs');
    });

    app.get('/help', function(req, res) {
          res.render('help.ejs');
    });

    app.get('/setup', function(req, res) {
          res.render('setup.ejs');
    });
}