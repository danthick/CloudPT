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

    app.delete("/api/register", async function(req, res){
        var user = await getUserByEmail(req._passport.session.user);
        await schemas.User.findOneAndDelete({email: user[0].email})
        res.sendStatus(200);
    });

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

    app.get("/api/user", async function (req, res) {
        var user = await getUserByEmail(req.session.passport.user);
        return res.json({
            currentUser: user
        })
    });

    // Route to return user 
    app.post("/api/user", async function(req, res){
        var user = await getUserByEmail(req.body.email)
        var currentUser = await getUserByEmail(req.session.passport.user)
        if (user.length != 0){
            return res.json({
                user: {
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    email: user[0].email
                },
                currentUser: currentUser
            })
        } else {
            return res.json({
                user: { email: null },
                currentUser: currentUser
            })
        }
    })

    // Endpoint to change user password
    app.post("/api/user/password", async function(req, res) {
        var user = await getUserByEmail(req.session.passport.user);

        // Checks current password matches user input
        if (bcrypt.compareSync(req.body.currentPassword, user[0].password)){
            // Hash password
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.newPassword, salt);

            // Update password
            await schemas.User.findOneAndUpdate({email: user[0].email}, {password: hash}, {new: true, useFindAndModify: false});

            // Return success
            return res.json({
                success: true
            })
        } else {
            // Return error
            return res.json({
                success: false
            })
        }
    });

    // End point to change user details
    app.post("/api/user/update", async function(req, res) {
        var user = await getUserByEmail(req.session.passport.user);
        // Update first and last name
        await schemas.User.findOneAndUpdate({email: user[0].email}, {firstName: req.body.firstName}, {new: true, useFindAndModify: false});
        await schemas.User.findOneAndUpdate({email: user[0].email}, {lastName: req.body.lastName}, {new: true, useFindAndModify: false});

        // Checking is users email has been changed
        if(req.body.email !== req.session.passport.user){
            // Checking new email is unused
            var newEmail = await getUserByEmail(req.body.email);
            if (newEmail[0] == null) {
                // Updating all recored in database
                await schemas.Weight.updateMany({email: user[0].email}, {email: req.body.email}, {new: true, useFindAndModify: false});
                await schemas.Message.updateMany({userTo: user[0].email}, {userTo: req.body.email}, {new: true, useFindAndModify: false});
                await schemas.Message.updateMany({userFrom: user[0].email}, {userFrom: req.body.email}, {new: true, useFindAndModify: false});
                await schemas.User.findOneAndUpdate({email: user[0].email}, {email: req.body.email}, {new: true, useFindAndModify: false});
            } else {
                return res.json({
                    success: false
                })
            }
        }
        return res.json({
            success: true
        })
    });

    app.post("/api/user/role", async function(req, res) {
        var user = await getUserByEmail(req.session.passport.user);
        if(user[0].ptBool){
            await schemas.User.findOneAndUpdate({email: user[0].email}, {ptBool: false}, {new: true, useFindAndModify: false});
            return res.json({
                success: true
            })
        } else {
            await schemas.User.findOneAndUpdate({email: user[0].email}, {ptBool: true}, {new: true, useFindAndModify: false});
            return res.json({
                success: true
            })
        }
    });

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
}