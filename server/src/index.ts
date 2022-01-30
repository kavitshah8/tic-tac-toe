
import {WebSocketServer} from "ws";
import WebSocket = require("ws");
import {updateGameState, checkGameState} from "./ticTacToe";

const wss = new WebSocketServer({port: 8000});

// Server Side APIs
// onconnection
// onclose
// onmessage
// send

// onconnection seem to work only on server side
// all the code on server side should reside in the callback
wss.on("connection", socket => {

    let count = 0;
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            count++;
        }
    });

    socket.onclose = socket => {
        console.log("socket disconnected", socket.code)
    }

    socket.onmessage = msg => {
        // Broadcast to everyone
        wss.clients.forEach(client => {

            // msg.data is a buffer in this case a string buffer, thanks TypeScript
            // https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/
            // msg.data.toString() converts buffer of string to string object
            let message = msg.data.toString("utf-8"),
                data = message.split(",");

            updateGameState(Number(data[0]), data[1]);

            // if (checkGameState()) {
            //     data.push(data[1]);
            // }
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });
    }
});

console.log("WebSocket Server running on port: 8000")

