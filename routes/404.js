

module.exports = function(app, passport) {

    // =============================================================================
    // ROOT ========================================================================
    // =============================================================================

 
app.get('*', function(req, res){
   res.send("These are not the ions you're looking for....", 404);
 });          
}