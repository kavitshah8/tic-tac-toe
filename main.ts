let socket;
enum GameState {
    WON = "WON",
    DRAW = "DRAW",
    CONT = "CONTINUE"
};

const gameContinues = "Game continues",
    gameDraw = "Game DRAW";
let createWinningMessage = (player) => `Player ${player} wins!`;

function handleCellClick(event) {
    if (!sessionStorage.getItem("player")) {
        alert("Select a player either X or Y");
        return;
    }

    let target = event.target;
    const moveValue = sessionStorage.getItem("player"),
        moveIndex = parseInt(target.getAttribute("data-cell-index"));
    
    // Send data to server to broadcast to other sockets
    socket.send([moveIndex, moveValue]);
    // Optional serialization. Seems like browser serializes it.
    // socket.send([moveIndex, moveValue].toString());

    // disable click event
    let el = document.getElementsByClassName("game--container");
    document.querySelectorAll(".cell")
    .forEach(cell => {
       cell.setAttribute("disabled", "true"); 
       cell.setAttribute("disabled", "false");
       cell.addEventListener("click", (e)=>{
        e.preventDefault();
       },false); 
    //    TS COmpile error
    //    cell.style.pointer-events= "none"; 
    });
}

function handleRestart() {
    // if number of active connection >=2 restart the game
}

function handlePlayerClick(event) {
    // if (!sessionStorage.getItem("player")) {
        sessionStorage.setItem("player", event.target.innerHTML);
    // }
    // remove the current target element which is a parent
    // event.target.remove();
    // event.currentTarget.remove();
}

function restartGame() {
    document
        .querySelectorAll(".cell")
        .forEach(cell => {
            // cell.innerHTML = "";
        });
}

(function init() {
    
    if ("WebSocket" in window) {
        socket = new WebSocket("ws://localhost:8000");
        // socket.send()
        
        // open seem to work only on client side
        // socket.onopen = () => {};
        
        // Update Each Scoket's UI after successfully receiving data from server
        socket.onmessage = (msg) => {
            let data = msg.data.split(","),
                moveIndex = data[0],
                moveValue = data[1],
                gameState = data[2];
            // Upon receiving data from server, update UI
            let target = document.querySelectorAll(`[data-cell-index="${moveIndex}"]`);
            target[0].innerHTML = moveValue;

            let gameStateElement = document.querySelector(".game--status");
            if (gameState == GameState.WON) {
                gameStateElement.innerHTML = createWinningMessage(moveValue);
                // restart the game
                restartGame();
            } else if (gameState == GameState.DRAW) {
                gameStateElement.innerHTML = gameDraw;
            } else {
                gameStateElement.innerHTML = gameContinues;
            }
            // enable event handler
        }
    }

    // attach event handlers
    document
        .querySelectorAll(".cell")
        .forEach((cell) => cell.addEventListener("click", handleCellClick));
    
    document
        .querySelectorAll(".player")
        .forEach((player)=> player.addEventListener("click", handlePlayerClick));
})();