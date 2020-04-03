var WebSocketServer = require("websocket").server;

module.exports = function (app, server) {

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
            // Assigning email address to client
            if(message.utf8Data.substring(0,5) === "email"){
                clients[clients.length-1] = [clients[clients.length-1], message.utf8Data.substring(6)]
            }
            if(message.utf8Data.substring(0,11) === "messageSent"){
                // new message has been sent
                // send out message to client with email address of userTo!
                console.log(message.utf8Data.substring(12))

                // Check which client message was sent to
                clients.forEach(function(client){
                    if (client[1] == message.utf8Data.substring(12)){
                        // message has been sent to this user
                        console.log("sending message...")
                        client[0].send("messageReceived")
                    }
                })
            }
        });
    });

}