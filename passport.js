const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require ("bcryptjs");
var schemas = require("./schemas")

function initPassport(passport){
    const auth = async (email, password, done) => {
        // Find user using email address
        var user = await getUserByEmail(email);

        if (user[0] == null){
            // Display message if user is not found
            return done(null, false, {message: "Email not valid"});
        }
        try{
            // Checks password matches
            if (bcrypt.compareSync(password, user[0].password)){
                // Returns no errors and logs user in
                return done(null, user);
            } else {
                // Displays message if password in incorrect
                return done(null, false, {message: "Incorrect password"});
            }
        } catch (e) { return done(e); }
    }

    // Authenticates using email and password for login.ejs
    if (passport != null){
        passport.use(new LocalStrategy({usernameField: "email"}, auth)); // Password not needed as it is already set to defualts
    }
    // Serialize and deserialize functions for logging in and out
    passport.serializeUser((user, done) => {
        done(null, user[0].email)})
    passport.deserializeUser((email, done) => { 
        done(null, getUserByEmail(email))
    })
}

// Function to get user from email
async function getUserByEmail(email){
    var user = await schemas.User.find({
        email: email
    });
    return user;
}
module.exports.initPassport = initPassport;