let socket;

function handleCellClick(event) {
    if (!sessionStorage.getItem("player")) {
        alert("Select a player either X or Y");
        return;
    }

    const target = event.target,
        currentPlayer = sessionStorage.getItem("player"),
        cellIndex = Number.parseInt(target.getAttribute("data-cell-index"));
    console.log(currentPlayer)  
    target.innerHTML = currentPlayer;
    let arr = [cellIndex, currentPlayer];
    // Send data to server to broadcast to other sockets
    socket.send(arr);
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

(function init() {
    
    if ("WebSocket" in window) {
        socket = new WebSocket("ws://localhost:8000");
        // socket.send()
        
        // open seem to work only on client side
        // socket.onopen = () => {};
        
        socket.onmessage = (msg) => {
            // Upon receiving data from server, update UI
            let target = document.querySelectorAll(`[data-cell-index="${msg.data[0]}"]`);
            target[0].innerHTML = msg.data[2];
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