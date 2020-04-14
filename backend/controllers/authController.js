const passport = require("passport");
const bcrypt = require("bcryptjs");
const schemas = require("../schemas");
const SparkPost = require('sparkpost')

module.exports = function (app) {
    // Route to attempt login
    app.post("/api/login", checkNotAuthenticated, passport.authenticate("local", {
        successRedirect: "/api/login/success",
        failureRedirect: "/api/login/failed",
        failureFlash: true
    }));

    // Returns {auth: true} if passport login successful
    app.get("/api/login/success", function (req, res) {
        return res.json({
            auth: true,
            user: req.user
        })
    });

    // Returns {auth: false} if passport login successful
    app.get("/api/login/failed", function (req, res) {
        return res.json({
            auth: false,
            user: req.user
        })
    });

    // Route to register a user
    app.post("/api/register", checkNotAuthenticated, async function (req, res) {
        // Hash password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        // Checking if email already exists
        var user = await getUserByEmail(req.body.email);
        if (user[0] == null) {
            var newUser = new schemas.User({
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                ptBool: req.body.ptBool
            });
            // Save user and return successful redirect
            newUser.save();
            return res.json({
                redirect: '/'
            })
        } else {
            // Return failed if email is already in use
            return res.json({
                redirect: '/fail'
            })
        }
    })

    // Checking if user has active session
    app.get("/api/auth", async function (req, res) {
        if (!req.user) {
            return res.json({
                redirect: '/'
            })
        } else {
            // Get user to check if they are a PT or not
            var user = await getUserByEmail(req.session.passport.user);
            return res.json({
                redirect: '/home',
                ptBool: user[0].ptBool
            })
        }



        
    })

    // Route to logout and destroy current user session
    app.get("/api/logout", async function (req, res) {
        req.logOut();
        req.session.destroy(function (err) {
            return res.json({
                logout: true
            })
        });
    });

    // Function to check if user is not logged in and if they are re-direct them to the home page
    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect("/home");
        }
        next();
    }

    // Function to check if user is logged in and if they are not re-direct them to the login page
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
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

    function sendConfirmationEmail(){
        const client = new SparkPost('0637adc686a115395f4f4ccb9477d0c511f3f526')
        client.transmissions.send({
            headers: {
                "Content-Type": "application/json",
                "Authorization": "14ac5499cfdd2bb2859e4476d2e5b1d2bad079bf"
            },
        content: {
            name: "CloudPT",
            from: 'no-reply@cloudpt.me',
            subject: 'Hello from app',
            html: '<p>Hello world</p>'
        },
        recipients: [
            {address: 'dan.thick@hotmail.co.uk'}
        ]
        })
        .then(data => {
        console.log('Woohoo! You just sent your first mailing!')
        console.log(data)
        })
        .catch(err => {
        console.log('Whoops! Something went wrong')
        console.log(err)
        })
    }
}