var path = require("path");
var express = require("express");
var schemas = require("../schemas")
var passport = require("passport")
var passportFunc = require("../passport");
var bcrypt = require("bcryptjs");

module.exports = function(app){
    // Initialise passport
    passportFunc.initPassport(passport);

    // Making views folder public
    app.use(express.static(path.join(__dirname, '../views')));

    // Setting port to listen on
    var server = app.listen(process.env.PORT || 9000, function () {
        console.log("Listening on 9000");
    })

    // Route to index
    app.get("/", checkNotAuthenticated, function (request, response) {
        response.status(200).sendFile(path.join(__dirname, '../views/login.html'))
    });

    // Route to attempt login
    app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true
    }));

    // Route to show register page
    app.get("/register", checkNotAuthenticated, function (request, response) {
        response.status(200).sendFile(path.join(__dirname, '../views/register.html'))
    });

    // Route to register a user
    app.post("/register", checkNotAuthenticated, async function(req, res){
        // Hash password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        // Checking if email already exists
        var user = await getUserByEmail(req.body.email);
        if (user[0] == null){
            var newUser = new schemas.User({
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            });
            // Save user
            newUser.save();
            res.status(200).redirect("/");
        } else {
            res.sendStatus(400);
        }
    })
    
    // Route to display home page
    app.get("/home", checkAuthenticated, function (request, response) {
        response.status(200).sendFile(path.join(__dirname, '../views/home.html'))
    });

    // Function to get user from email
    async function getUserByEmail(email) {
        return await schemas.User.find({
            email: email
        });
    }

    // Function to check if user is not logged in and if they are
    // re-direct them to the home page
    function checkNotAuthenticated(req, res, next){
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()){
            return res.redirect("/home");
        }
        next();
    }
    
    // Function to check if user is logged in and if they are not
    // re-direct them to the login page
    function checkAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/")
    }
}