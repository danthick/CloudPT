var express = require("express");

// Setting up server
var app = express();

app.get("/", function (request, response) {
    response.status(200).sendFile("/", {
        root: "client"
    });
});
// Setting port to listen on
var server = app.listen(9000, function () {
    console.log("Listening on 9000");
})

// Export server, to be used for unit tests
module.exports = app;