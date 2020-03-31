var mongoose = require("mongoose")

// User data structure
var User = mongoose.model("user", {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    height: Number,
});

// Weight data structure
var Weight = mongoose.model("weight",{
    email: String,
    weight: Number,
    date: Date,
});

// Messages data structure
var Message = mongoose.model("message", {
    userTo: String,
    userFrom: String,
    read: Boolean,
    text: String,
    date: String,
});

// Export data structures
module.exports.User = User;
module.exports.Weight = Weight;
module.exports.Message = Message;