
module.exports = function(app, passport) {

    // =============================================================================
    // ROOT ========================================================================
    // =============================================================================


    app.get('/', function(req, res) {
          res.render('dashboard.ejs');
    });

    app.get('/newfiber', function(req, res) {
          res.render('newfiber_1.ejs');
    });

        app.get('/newfibertc', function(req, res) {
          res.render('newfiber_2.ejs');
    });

        app.get('/newfiberadj', function(req, res) {
          res.render('newfiber_3.ejs');
    });

        app.get('/newfibercond', function(req, res) {
          res.render('newfiber_4.ejs');
    });

    app.get('/startsequence', function(req, res) {
          res.render('startsequence_1.ejs');
    });

    app.get('/wiki', function(req, res) {
          res.render('wiki.ejs');
    });

    app.get('/options', function(req, res) {
          res.render('options.ejs');
    });
}