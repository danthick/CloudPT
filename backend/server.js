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
      origin: "http://localhost:3000", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
    })
  );

passportFunc.initPassport(passport);

// Route to attempt login
app.post("/login", checkNotAuthenticated, passport.authenticate("local"),
function(req, res){
    return res.json({redirect: '/home', user: req.user})
});

// Route to register a user
app.post("/register", checkNotAuthenticated, async function(req, res){
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
        // Save user
        newUser.save();
        return res.json({redirect: '/'})
    } else {
        res.sendStatus(400);
    }
})

app.get("/api/auth", function(req, res){
    console.log(req.user)
    console.log(req.isAuthenticated())
    if (!req.user) {
        console.log("NOT LOGGED IN")
      } else {
        console.log("LOGGED IN")
      }
})

app.get("/logout", async function (req, res) {
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