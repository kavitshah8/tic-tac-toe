### To Do

    - Setup Type Script
    - Game State
        - Detect winning condition
        - Restart the game after winning condition
        - Update UI with wining condition
    - Synchronization
        - Freeze UI until someone does something 
    - Let players switch between X and 0
        Use cookies to remember users choice

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
