const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const passportFunc = require("./passport");
const flash = require("express-flash");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const schemas = require("./schemas")
const cookieParser = require("cookie-parser");
const PORT = 4000 || process.env.PORT;

// Connect to database
const uri = "mongodb+srv://dthick:VI55F0PYGAu4BFv3@cluster-vjwy9.mongodb.net/cloudpt?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if (err) { console.log(err); } 
    else { console.log("Connected to database");}
});

app.use(session({
    secret: "TxuYJTpXtoQZuIJiHtgt",
    name: "session",
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {maxAge: 1 * 60 * 60 * 1000} // 1 hour of inactivity
}))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
      origin: "https://cloudpt.me/", // Allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
    })
  );

passportFunc.initPassport(passport);

// Route to attempt login
app.post("/api/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/api/login/success",
    failureRedirect: "/api/login/failed",
    failureFlash: true
}));

app.get("/api/login/success", function (req, res){
    return res.json({auth: true, user: req.user})
});

app.get("/api/login/failed", function (req, res){
    return res.json({auth: false, user: req.user})
});

// Route to register a user
app.post("/api/register", checkNotAuthenticated, async function(req, res){
    // Hash password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    // Checking if email already exists
    var user = await getUserByEmail(req.body.email);
    console.log(user[0])
    if (user[0] == null){
        var newUser = new schemas.User({
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        // Save user and return successful redirect
        newUser.save();
        return res.json({redirect: '/'})
    } else {
        // Return failed if email is already in use
        return res.json({redirect: '/fail'})
    }
})

app.get("/api/auth", function(req, res){
    if (!req.user) {
        return res.json({redirect: '/'})
      } else {
        return res.json({redirect: '/home'})
      }
})

app.get("/api/logout", async function (req, res) {
    req.logOut();
    req.session.destroy(function (err) {
        //res.redirect('/');
      }); 
});

// Function to check if user is not logged in and if they are re-direct them to the home page
function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect("/home");
    }
    next();
}

// Function to check if user is logged in and if they are not re-direct them to the login page
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/")
}

// Function to get user from email
async function getUserByEmail(email) {
    return await schemas.User.find({
        email: email
    });
}

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});