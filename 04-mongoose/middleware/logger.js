const winston = require("winston")
require('winston-mongodb');


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.MongoDB({db:"mongodb://localhost:27017/playground"})
        
    ]
});

logger.exceptions.handle(
    new winston.transports.File({ filename: 'exceptions.log' })
)
 
logger.rejections.handle(
    new winston.transports.File({ filename: 'rejections.log' })
);

module.exports = logger