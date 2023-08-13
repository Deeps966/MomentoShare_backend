const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize(),
    winston.format.align(),
  ),


  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'application.log' }),
  ],
});

module.exports = logger;