const uuidv1 = require('uuid/v1');


const { sendMessage } = require('../UdpSocket/Sender');
const { updateFPS } = require('../util/constants');

const Board = require('./GameObjects/Board');

let lastUpdate;

let GameEngine = class {
    constructor() {
        this.id = uuidv1();
        this.updatePointer = undefined;

        this.board = new Board();
    }

    isBoardFull() {
        return this.board.isFull();
    }

    addPlayer(ip, port, socket) {
        return this.board.addPlayer(ip, port, socket);
    }

    start() {
        console.log("Start");
        lastUpdate = Date.now();
        this.updatePointer = setInterval(() => update(this.board), 1000 / updateFPS);
    }

    stop() {
        if(this.updatePointer) {
            clearInterval(this.updatePointer);
            this.updatePointer = undefined;
        }
    }

    isRunning(){
        return !!updatePointer;
    }

}

module.exports = GameEngine;

const update = (board) => {
    const players = board.getPlayers();

    updatePlayerPositions(players);
    sendBoardToClients(players, board);
}
const updatePlayerPositions = (players) => {
    const now = Date.now;
    const elapsedTime = now - lastUpdate;
    lastUpdate = now;

    Object.keys(players).forEach(key => {
        const player = players[key];
        player.updatePosition(elapsedTime)
    });
}
const sendBoardToClients = (players, board) => {
    // const bufferData = Buffer.from(this.board);

    Object.keys(players).forEach(key => {
        const msg = {
            eventType: 'receive-board',
            board
        }

        const player = players[key];
        sendMessage(player.ip, player.port, msg);
    });
    // players.forEach(player => {
    //     player.socket.write(bufferData);
    // });  
}