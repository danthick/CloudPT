var schemas = require("./schemas");

// Connecting to database
var mongoose = require("mongoose");
const uri = "mongodb://dthick:m18WKhWQLWq9Bak2@soft355-shard-00-00-vjwy9.mongodb.net:27017,soft355-shard-00-01-vjwy9.mongodb.net:27017,soft355-shard-00-02-vjwy9.mongodb.net:27017/cloudpt?ssl=true&replicaSet=SOFT355-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if (err) { 
        console.log(err); 
    } else {
        console.log("Connected to database"); 
    }
})

function addUser(){
    // Create a new user
    var newUser = new schemas.User({
        "email": "test@test.com",
        "password": "password",
        "firstName": "Test",
        "lastName": "Test"
    });
    // Save user
    newUser.save();
}


// Delete a user
// Async function used for application to wait for a response
async function deleteUser(){
    await schemas.User.findOneAndDelete({
        email: "test@test.com",
    }, function (err, data) {});
}


// Update a user
async function updateUser(){
    await schemas.User.findOneAndUpdate({
        email: "test@test.com"
    }, {
        "firstName": "Dan"
    }, {useFindAndModify: false} , await function (err, data) {});
}

// Gets user by email and ouputs details
async function getUser(email){
    var user = await schemas.User.find({
        email: email
    });
    console.log(user);
}

addUser();
updateUser();
getUser("test@test.com");
deleteUser();