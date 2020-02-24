const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var passport = require("passport");
var passportFunc = require("./passport");
var flash = require("express-flash");
var session = require("express-session");
var bcrypt = require("bcryptjs");
var schemas = require("./schemas")
const todoRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "TxuYJTpXtoQZuIJiHtgt",
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {maxAge: 1 * 60 * 60 * 1000} // 1 hour of inactivity
}))
app.use(passport.initialize());
app.use(passport.session());

passportFunc.initPassport(passport);

// Connect to database
const uri = "mongodb+srv://dthick:VI55F0PYGAu4BFv3@cluster-vjwy9.mongodb.net/cloudpt?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if (err) { console.log(err); } 
    else { console.log("Connected to database");}
});



todoRoutes.route('/').get(function(req, res) {
    
});

// Route to attempt login
app.post("/login", checkNotAuthenticated, passport.authenticate("local"),
function(req, res){
    console.log("here")
    return res.json({redirect: '/home'})
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
        //res.status(200).redirect("http://localhost:3000/");
    } else {
        res.sendStatus(400);
    }
})

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