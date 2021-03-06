
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

    let gameState;
    
    // wss.clients is a global which one can use
    // wss.clients.forEach((client) => {
        // });

    socket.onmessage = msg => {
        // msg.data is a buffer in this case a string buffer, thanks TypeScript
        // https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/
        // msg.data.toString() converts buffer of string to string object
        let message = msg.data.toString("utf-8");
        let data = JSON.parse(message);
        
        updateGameState(Number(data.entity[0].components.Position.index), data.moveValue);
        gameState = checkGameState();
        data["gameState"] = gameState;
        
        if (gameState == GameState.WON) {
            restartGame();
        }
        
        // Broadcast to everyone except the sending client
        // Broadcast to everyone
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {                 
                data.isPublisher = (client == socket) ? true: false;
                client.send(JSON.stringify(data));
            }
        });
    }
    
    socket.onclose = socket => {
        console.log("socket disconnected", socket.code);
    }

});

console.log("WebSocket Server running on port: 8000")
