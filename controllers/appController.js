module.exports = function(app){
    // Setting port to listen on
    var server = app.listen(process.env.PORT || 9000, function () {
        console.log("Listening on 9000");
    })

    // Route to index
    app.get("/", function (request, response) {
        response.status(200).sendFile("/", {
            root: "views"
        });
    });
}

