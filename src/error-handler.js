const { createLogger, format, transports } = require('winston')

const { combine, timestamp, json, errors,  } = format

const level = (process.env.stage === 'production') ? 'warn' : 'debug'

const logger = createLogger({
    format: combine(
        errors({ stack: true }), // <-- use errors format
        timestamp(),
        json()
    ),
    transports: [new transports.Console({ level })],
})


module.exports.errorHandler = async error => {
    logger.error('Error message from error handler', error)
    await toEventHandler(error)
    if (error.isOperational) {
        return error.toJSON()
    }
    logger.info('Finished processing the error')
}


const toEventHandler = (error) => {
    logger.info('sending error to event handler', error)
    return new Promise(resolve => setTimeout(resolve, 2000))
}