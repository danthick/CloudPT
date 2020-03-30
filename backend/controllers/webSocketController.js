var WebSocketServer = require("websocket").server;

module.exports = function (app) {

    // Creating a web socket server
    var wss = new WebSocketServer({
        httpServer: server
    });
    // Array to store all connected clients
    var clients = [];

    // WebSocket functions
    wss.on('request', function (request) {
        // Accept connection and push to array
        var connection = request.accept(null, request.origin);
        clients.push(connection);
        connection.on('message', function (message) {
            // Sends message to all clients when a change has been made. Includes user email to ensure the right client gets the message.
            var email = message.utf8Data;
            clients.forEach(function (client) {
                client.send(message.utf8Data);
            });
        });
    });

}