var mongoose = require("mongoose")

// User data structure
var User = mongoose.model("user", {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
});

// Export data structures
module.exports.User = User;