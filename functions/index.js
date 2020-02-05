const functions = require('firebase-functions');
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, function(){
    console.log("Listening on port 3000...");
});

app.get('/ping', (req, res) => {
    alert("PING");
    res.send("Hello");
});
console.log("TESTTTT");
exports.app = functions.https.onRequest(app);