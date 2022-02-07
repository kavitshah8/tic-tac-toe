
import {WebSocketServer} from "ws";
import WebSocket = require("ws");
import {updateGameState, checkGameState, GameState, restartGame} from "./ticTacToe";

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
    let gameState;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            count++;
            console.log();

            // Init data for each client on connection
            let gameState = ["", "", "", "", "", "", "", "", ""];
        }
    });

    socket.onclose = socket => {
        console.log("socket disconnected", socket.code);
    }

    socket.onmessage = msg => {
        // msg.data is a buffer in this case a string buffer, thanks TypeScript
        // https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/
        // msg.data.toString() converts buffer of string to string object
        let message = msg.data.toString("utf-8");
        let data = message.split(",");
        
        updateGameState(Number(data[0]), data[1]);
        gameState = checkGameState();
        data.push(gameState);
        
        if (gameState == GameState.WON) {
            restartGame();
        }
        
        // Broadcast to everyone
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });
    }
});

console.log("WebSocket Server running on port: 8000")
