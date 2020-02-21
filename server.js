var express = require("express");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport")
var appController = require("./controllers/appController");
var flash = require("express-flash");

// Setting up server and session settings
var app = express();
app.set('engine', 'ejs');
app.use(flash());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
    secret: "TxuYJTpXtoQZuIJiHtgt",
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {maxAge: 1 * 60 * 60 * 1000} // 1 hour of inactivity
}))
app.use(passport.initialize());
app.use(passport.session());

// Connect to database
const uri = "mongodb+srv://dthick:VI55F0PYGAu4BFv3@cluster-vjwy9.mongodb.net/cloudpt?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if (err) { 
        console.log(err); 
    } else {
        console.log("Connected to database"); 
    }
})

appController(app);

// Redirecting all unknown routes to the login page
// app.all('*', function(req, res){
//     res.redirect('/login');
// })

// Export server, to be used for unit tests
module.exports = app;