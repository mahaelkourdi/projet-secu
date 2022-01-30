var winston = require('winston');
const { combine, timestamp,printf, colorize, align,json } = winston.format;
//const tes = require('../')

// define the custom settings for each transport (file, console)
// var options = {
//     file: {
//       level: 'info',
//       filename: `../logs/app.log`,
//       handleExceptions: true,
//       json: true,
//       maxsize: 5242880, // 5MB
//       maxFiles: 5,
//       colorize: false,
//     },
//     console: {
//       level: 'debug',
//       handleExceptions: true,
//       json: false,
//       colorize: true,
//     },
//   };

// const logLevels = {
// fatal: 0,
// error: 1,
// warn: 2,
// info: 3,
// debug: 4,
// trace: 5,
// };

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
    //levels: logLevels,
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
          //colorize({ all: true }),
          timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
          }),
          //align(),
          json()
          //printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
        ),//combine(timestamp(), json()),
    transports: [
        new winston.transports.File({
            filename: './logs/app.log',
          }),
        new winston.transports.File({
          filename: './logs/app-error.log',
          level: 'error',
        }),
    ],
  });

// var logger = new winston.Logger({
// transports: [
//     new winston.transports.File(options.file),
//     new winston.transports.Console(options.console)
// ],
// exitOnError: false, // do not exit on handled exceptions
// });


module.exports = logger;
