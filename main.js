let socket;
function handleCellClick(event) {
    // Update the current socket
    const target = event.target;
    target.innerHTML = "X";
    // Send data to server to broadcast to other sockets
    const cellIndex = Number.parseInt(target.getAttribute("data-cell-index"));
    socket.send(cellIndex);
}

function handleRestart() {
    // if number of active connection >=2 restart the game
}

(function init() {
    
    if ("WebSocket" in window) {
        socket = new WebSocket("ws://localhost:8000");
        // socket.send()
        
        // open seem to work only on client side
        // socket.onopen = () => {};
        
        socket.onmessage = (msg) => {
            // Upon receiving data from server, update UI
            let target = document.querySelectorAll(`[data-cell-index="${msg.data}"]`);
            console.log("target = ", target);
            target[0].innerHTML = "X";
        }
    }

    // attach event handlers
    document
        .querySelectorAll(".cell")
        .forEach((cell) => cell.addEventListener("click", handleCellClick));
})();