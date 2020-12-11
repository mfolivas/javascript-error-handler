
const HttpStatusCode = {
    OK: 200,
    NOT_FOUND: 400,
    BAD_REQUEST: 404,
    INTERNAL_SERVER: 500
}

class BaseError extends Error {
    constructor(name, httpStatusCode, description, isOperational) {
        super(description)
        this.name = name
        this.httpStatusCode = httpStatusCode
        this.isOperational = isOperational

    }   
    toJSON() {
        return {
            name: this.name,
            httpStatusCode: this.httpStatusCode,
            description: this.description,
            isOperational: this.isOperational
        }
    }
}


class APIError extends BaseError {
    constructor(name, httpStatusCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpStatusCode, isOperational, description)
    }
}

class HTTP400Error extends APIError {
    constructor(...args) {
        super('NOT FOUND', HttpStatusCode.NOT_FOUND, true, `The following fields are required: ${args}`)
    }
}

module.exports = {
    HTTP400Error,
    HttpStatusCode,
    APIError,
    BaseError
}