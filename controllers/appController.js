var path = require("path");
var express = require("express");
var schemas = require("../schemas")
var passport = require("passport")
var passportFunc = require("../passport");
var bcrypt = require("bcryptjs");

module.exports = function(app){
    // Initialise passport
    passportFunc.initPassport(passport
        // Get user from email function
        // email = async(email) => {
        //     var user =  await schemas.User.find({
        //         email: email
        //     });
        //     console.log(user[0]);
        //     return user;
        //}
        );

    // Making views folder public
    app.use(express.static(path.join(__dirname, '../views')));

    // Setting port to listen on
    var server = app.listen(process.env.PORT || 9000, function () {
        console.log("Listening on 9000");
    })

    // Route to index
    app.get("/", function (request, response) {
        response.status(200).sendFile(path.join(__dirname, '../views/login.html'))
    });

    app.get("/login", function (request, response) {
        response.status(200).sendFile(path.join(__dirname, '../views/login.html'))
    });

    app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
        successRedirect: "/home.html",
        failureRedirect: "/login.html",
        failureFlash: true
    }));

    app.get("/register", function (request, response) {
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
                passport: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            });
            // Save user
            newUser.save();
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    })

    // Function to get user from email
    async function getUserByEmail(email) {
        return await schemas.User.find({
            email: email
        });
    }

    function checkNotAuthenticated(req, res, next){
        if (req.isAuthenticated()){
            console.log("Auth");
            return res.redirect("/home.html");
        }
        next();
    }
}