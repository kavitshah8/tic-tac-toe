
import WebSocket, {WebSocketServer} from "ws";
import {updateGameState, checkWin} from "./ticTacToe.js";

const wss = new WebSocketServer({port: "8000"});

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
        // excluding yourself, broadcast to everyone
        wss.clients.forEach(client => {
            if (client != socket && client.readyState === WebSocket.OPEN) {
                client.send(msg.data);
            }
            // update gamestate
            updateGameState(msg.data[0], msg.data[2]);
            checkWin();
        });
    }
});

console.log("WebSocket Server running on port: 8000")

