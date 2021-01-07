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

    const errorResponse = prettifiedError(error, stringifyError)
    logger.info('Finished processing the error')
    if (errorResponse) {
        return errorResponse
    }
    await toEventHandler(errorResponse)
    throw error
}

const prettifiedError = (error, stringifyError = false) => {
    if (error.isOperational) {
        return (stringifyError) ? JSON.stringify({ error: error.toJSON() }) : error.toJSON()
    } else if (stringifyError) {
        return JSON.stringify({httpStatusCode: 500, error: error.message})
    }
}


const toEventHandler = (error) => {
    logger.info('sending error to event handler', error)
    return new Promise(resolve => setTimeout(resolve, 2000))
}