### To Do

    - Synchronization
        - Freeze UI until someone does something : prevent default
    
    - Let players switch between X and 0
        Use cookies to remember users choice

    - Build 
        - Setup TypeScript
        - Easier scripts to bundle things
    
    - Client side reset improvemnet 
        - Maybe add an animation

### Done
    
    Each client has a game state
        - Where does the game state should live?
        - Should it live on the client or server side? 
        - If we store it on the client side, we have to pass all these data during each request to the server 
    
    Game State
        - Detect winning condition
        - Restart the game after winning condition on server side
        - Update UI with wining condition

### Running

#### UI 

```
cd ~/code/ticTacToe
tsc main.ts --outDir dist
```

Just open `index.html`, using VSCode plugin to launch web app using Live Reloading 
#### server
    - To start a server `cd server && npm run build && npm run start`

### HTML
https://developer.mozilla.org/en-US/docs/Web/API/Event/target

### Web Socket
https://github.com/websockets/ws

### Code pen
https://codepen.io/Abubakkar_Mohmand/pen/PoKMGVj

### Learnings
 - Data is passed using bufferes in the sockets
