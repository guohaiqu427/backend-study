const Logger = require("./logger")
const logger = new Logger() 

logger.on("messageLoaded", (arg) => {
    console.log("listens emit from instance", arg)
})

logger.log ("calls emit function from instance")