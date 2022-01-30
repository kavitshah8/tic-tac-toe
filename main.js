let socket;

function handleCellClick(event) {
    if (!sessionStorage.getItem("player")) {
        alert("Select a player either X or Y");
        return;
    }

    let target = event.target;
    const moveValue = sessionStorage.getItem("player"),
        moveIndex = Number.parseInt(target.getAttribute("data-cell-index"));
    
    // Send data to server to broadcast to other sockets
    socket.send([moveIndex, moveValue]);
    // Optional serialization. Seems like browser serializes it.
    // socket.send([moveIndex, moveValue].toString());
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
        
        // Update Each Scoket's UI after successfully receiving data from server
        socket.onmessage = (msg) => {
            let data = msg.data.split(","),
                moveIndex = data[0],
                moveValue = data[1],
                winner = data[2];
            // Upon receiving data from server, update UI
            let target = document.querySelectorAll(`[data-cell-index="${moveIndex}"]`);
            target[0].innerHTML = moveValue;

            if (winner) {
                document.querySelector(".game--status").innerHTML = `Player ${winner} has won!`
            }
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