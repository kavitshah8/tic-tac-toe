
// ============================================
let socket;
let GameState = {
    "WON": "WON",
    "DRAW": "DRAW",
    "CONT": "CONTINUE"
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
    
    // Update UI
    target.innerHTML = sessionStorage.getItem("player");

    // Send data to server to broadcast to other sockets
    // Optional serialization. Seems like browser serializes it.
    // socket.send([moveIndex, moveValue].toString());

    // find entity id based on moveIndex
    let t = ECS.Entities.filter(entity => entity.components.Position.index == moveIndex);
    let data = {   
        entity: t,
        moveValue: moveValue
    };
    socket.send(JSON.stringify(data));

    // disable click event
    document.querySelectorAll(".cell").forEach(cell => {
       cell.style.pointerEvents = "none"; 
        // (cell as HTMLScriptElement).style.pointerEvents = "none"; 
    });
}

function handleRestart() {
    // if number of active connection >=2 restart the game
}

function handlePlayerClick(event) {
    sessionStorage.setItem("player", event.target.innerHTML);
}

function restartGame() {
    document
        .querySelectorAll(".cell")
        .forEach(cell => {
            // cell.innerHTML = "";
        });
}

// Entry Point for the Client Side Application
(function init() {
    // Create all the entities for ECS
    for (let i = 0; i < 9; i++) {
        let eng = new ECS.Entity();
        eng.addComponent(new ECS.Components.Position(i));
        eng.addComponent(new ECS.Components.Appearance({val: ""}));
    }

    // Send the whole ECS 
    // ECS.Systems.ViewSystem(ECS.Entities);

    if ("WebSocket" in window) {
        socket = new WebSocket("ws://localhost:8000");
        // socket.send()
        
        // open seem to work only on client side
        // socket.onopen = () => {};
        
        // Update Each Scoket's UI after successfully receiving data from server
        socket.onmessage = (msg) => {

            // Run ECS Systems:
            // PublisherSystem
            // RendererSystem
            
            let data = JSON.parse(msg.data),
            moveIndex = data.entity[0].components.Position.index,
            moveValue = data.moveValue,
            gameState = data.gameState;
            
            // ReceiverSysetm
            ECS.Systems.ReceiverSystem(moveIndex, moveValue);

            // ViewSystem
            ECS.Systems.ViewSystem(moveIndex, gameState);
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