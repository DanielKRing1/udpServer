const Queue = require('../Queue');

const { updatePlayerDirection } = require('./MessageHandlers/Player');

module.exports = {
    init: () => {

        this.messageQueue = new Queue();

        parseMessages();

        return module.exports;
    
    },

    queueMessage: (msg) => {
    
        this.messageQueue.enqueue(msg);
    
        setImmediate(parseMessages);
    },

    handleMessage: (msg) => {

        const { eventType } = msg;

        switch(eventType) {
            case 'update-direction':

                updatePlayerDirection(msg);
                break;

            case 'B':
                console.log('B');
                break;

            case 'C':
                console.log('C');
                break;
        }
    }
}

const parseMessages = () => {
    while(!this.messageQueue.isEmpty()) {

        const msg = this.messageQueue.dequeue();
        const jsonMsg = JSON.parse(msg);
        
        handleMessage(jsonMsg);
    }
}

// const handleMessage = (msg) => {

//     switch(msg.type) {
//         case 'move-player':
//             movePlayer();
//             break;

//         case 'B':
//             console.log('B');
//             break;

//         case 'C':
//             console.log('C');
//             break;
//     }
// }