const EventEmitter = require("events")

class Logger extends EventEmitter {
    log ( message ) {
        console.log(message)
        this.emit("messageLoaded", {a: 1})
    }
}
module.exports = Logger 