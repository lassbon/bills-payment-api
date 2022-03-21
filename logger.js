// const { createLogger, transports, format } = require('winston')

// const customeFormat = format.combine(format.timestamp(), format.printf((info) => {
//     return `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] - ${info.message}`
  
// }))
// const logger = createLogger({
//     format: customeFormat,
//     transports: [
//         new transports.Console(),
//         new transports.File({filename: 'app.log'})
//     ]
// })

// module.exports = logger;

const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

const myFormat = printf( ({ level, message, timestamp , ...metadata}) => {
  let msg = `${timestamp} [${level.toUpperCase().padEnd(7)}] : ${message} `  
  if(metadata) {
	msg += JSON.stringify(metadata)
  }
  return msg
});

const logger = createLogger({
  level: 'debug',
  format: combine(
	splat(),
	timestamp(),
	myFormat
  ),
  transports: [
	new transports.Console({ level: 'info' }),
	new transports.File({ filename: "app.log", level: 'debug' }),
  ]
})

module.exports = logger;