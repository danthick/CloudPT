var express = require("express");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport")
var appController = require("./controllers/appController");


// Setting up server
var app = express();
// Setting session settings
app.use(session({
    secret: "secret", // NEEDS TO CHANGE!!!!!!!
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {maxAge: 3600000}
}))
app.use(passport.initialize());
app.use(passport.session());

// Connect to database
const uri = "mongodb+srv://dthick:VI55F0PYGAu4BFv3@cluster-vjwy9.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db){
    if (err){
        console.log(err);
      } else {
          console.log("Connected to database");
      }
});

appController(app);

// Redirecting all unknown routes to the login page
app.all('*', function(req, res){
    res.redirect('/login');
})

// Export server, to be used for unit tests
module.exports = app;