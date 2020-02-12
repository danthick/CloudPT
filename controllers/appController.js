var path = require("path");
var express = require("express");
var passport = require("passport")

module.exports = function(app){
    // Initialise passport

    app.use(express.static(path.join(__dirname, '../views')));
    // Setting port to listen on
    var server = app.listen(process.env.PORT || 9000, function () {
        console.log("Listening on 9000");
    })

    // Route to index
    app.get("/", function (request, response) {
        response.status(200).sendFile(path.join(__dirname, '../views/login.html'))
    });
}

