const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
}

class BaseError extends Error {
    constructor(name, httpStatusCode, description, isOperational) {
        if (!Object.values(HttpStatusCode).includes(httpStatusCode)) {
            throw new TypeError('Invalid HTTP status code')
        }
        super(description)
        this.name = name
        this.httpStatusCode = httpStatusCode
        this.isOperational = isOperational

    }   
    toJSON() {
        return {
            name: this.name,
            httpStatusCode: this.httpStatusCode,
            description: this.message,
            isOperational: this.isOperational
        }
    }
}


class APIError extends BaseError {
    constructor(name, httpStatusCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpStatusCode, description, isOperational)
    }
}

class InvalidRequestError extends APIError {
    constructor(message) {
        super('InvalidRequestError', HttpStatusCode.BAD_REQUEST, true, message)
    }
}

class NotFoundError extends APIError {
    constructor(...args) {
        super('NotFoundError', HttpStatusCode.NOT_FOUND, true, `The following fields are required: ${args}`)
    }
}

module.exports = {
    InvalidRequestError,
    NotFoundError,
    HttpStatusCode,
    APIError,
    BaseError
}