const { createLogger, format, transports } = require('winston')
const R = require('ramda')

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

/**
 * 
 * @param {error} error will capture the error and return the application as JSON if it is operational.
 */
module.exports.errorHandler = async (error, stringifyError = false) => {
    logger.error('Error message from error handler', error)
    await toEventHandler(error)
    if (error.isOperational) {
        if (stringifyError) {
            JSON.stringify({ error: error.toJSON() })
        }
        return error.toJSON()
    }
    logger.info('Finished processing the error')
}


const toEventHandler = (error) => {
    logger.info('sending error to event handler', error)
    return new Promise(resolve => setTimeout(resolve, 2000))
}