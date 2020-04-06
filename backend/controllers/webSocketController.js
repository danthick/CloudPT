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
            message = JSON.parse(message.utf8Data)
            // Assigning email address to client
            if(message.messageType === "email"){
                var inClientList = false;
                console.log(message.email)
                clients.forEach(function(client, index){
                    if (client[1] === message.email){
                        inClientList = true;
                    }
                })
                if(!inClientList){
                    clients[clients.length-1] = [clients[clients.length-1], message.email]
                }
            }
            if(message.messageType === "messageSent"){
                // new message has been sent
                // send out message to client with email address of userTo!

                // Check which client message was sent to
                clients.forEach(function(client){
                    if (client[1] == message.userTo.email){
                        // message has been sent to this user
                        client[0].send(JSON.stringify(message))
                    }
                })
            }
        });
    });

}