var localStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");

function initPassport(passport, getUserByEmail){
    var auth = async (email, password, done) => {
        // Find user by email address
        var user = await getUserByEmail(email);

        if (user[0] == null){
            // Email address does not exist
            return done(null, false, {message: "Email address not found"});
        }
        try {
            if (bcrypt.compareSync(passport, user[0].password)){
                // User successfully logs in
                return done(null, user);
            } else {
                // Password not valid
                return done(null, false, {message: "Password is not correct"});
            }
        } catch (e) {return done(e);}
    } 
    // Authenticating using email and password
    if (passport != null){
        passport.use(new localStrategy({usernameField: "email"}, auth));
    }

    // Serialize and de-serialize functions for logging in and out
    passport.serializeUser((user, done) => {
        done(null, user[0].email);
    })
    passport.deserializeUser((email, done) => {
        done(null, getUserByEmail(email));
    })
}
module.exports.initPassport = initPassport;