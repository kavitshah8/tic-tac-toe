const wins = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];
let gameState = ["", "", "", "", "", "", "", "", ""];

enum GameState {
    WON = "WON",
    DRAW = "DRAW"
};
export function updateGameState(index: number, value: string) { 
    gameState[index] = value;
    console.log(gameState);
}

export function checkGameState() {
    for (let i = 0; i < wins.length; i++) {
        const wincondition = wins[i];
        const a = gameState[wincondition[0]],
            b =  gameState[wincondition[1]],
            c =  gameState[wincondition[2]];

        if (a == b && b == c && a != "") {
            return GameState.WON;
        }
    }

    if (!gameState.includes(""))
    
        return GameState.DRAW;
}