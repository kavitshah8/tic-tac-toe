ECS.Systems.ReceiverSystem = function ReceiverSysetm(moveIndex, moveValue) {
    let t = ECS.Entities.filter(entity => entity.components.Position.index == moveIndex);
    console.log("Rx msg from server Before ECS Update", t[0].print());
    t[0].components.Appearance.fill = moveValue;
    console.log("Rx msg from server after ECS Update", t[0].print());
}

ECS.Systems.ViewSystem = function ViewSystem (moveIndex, gameState) {
    
    let t = ECS.Entities.filter(entity => entity.components.Position.index == moveIndex);

    // Iterate over all the entities
    let target = document.querySelectorAll(`[data-cell-index="${moveIndex}"]`);
    target[0].innerHTML = t[0].components.Appearance.fill;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.pointerEvents = "auto"; 
         // (cell as HTMLScriptElement).style.pointerEvents = "none"; 
     });

     let gameStateElement = document.querySelector(".game--status");
    if (gameState == GameState.WON) {
        gameStateElement.innerHTML = createWinningMessage(t[0].components.Appearance.fill);
        // restart the game
        restartGame();
    } else if (gameState == GameState.DRAW) {
        gameStateElement.innerHTML = gameDraw;
    } else {
        gameStateElement.innerHTML = gameContinues;
    }
    
    // // enable click events on grid cells
    // document.querySelectorAll(".cell").forEach(cell => {
    //     console.log("setting pointer events to NONE");
    //     // (cell as HTMLScriptElement).style.pointerEvents = "auto"; 
    //     cell.style.pointerEvents = "auto"; 
    // });

}