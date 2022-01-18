// https://github.com/websockets/ws
// node index.js, starts the server
import WebSocket, {WebSocketServer} from "ws";

const wss = new WebSocketServer({port: "8000"});


// Server Side APIs
// onconnection
// onclose
// onmessage
// send

// onconnection seem to work only on server side
// all the code on server side should reside in the callback
wss.on("connection", socket => {

    socket.onclose = socket => {
        console.log("socket disconnected", socket.code)
    }

    socket.onmessage = msg => {
        console.log("received:", msg.data);

        // excluding yourself, broadcast to everyone
        wss.clients.forEach(client => {
            if (client != socket && client.readyState === WebSocket.OPEN) {
                client.send(msg.data);
            }
        });
    }

});

console.log("WebSocket Server running on port: 8000")