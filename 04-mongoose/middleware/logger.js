const winston = require("winston")
require('winston-mongodb');


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.MongoDB({db:"mongodb://localhost:27017/playground"})
    ]
});


module.exports = logger