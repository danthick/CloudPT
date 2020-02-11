var express = require("express");
var appController = require("./controllers/appController");
var mongoose = require("mongoose");

// Setting up server
var app = express();

// Connect to database
const uri = "mongodb+srv://dthick:VI55F0PYGAu4BFv3@cluster-vjwy9.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db){
    if (err){
        console.log(err);
      } else {
          console.log("Connected to database");
      }
});

appController(app);

// Export server, to be used for unit tests
module.exports = app;