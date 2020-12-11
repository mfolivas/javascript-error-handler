const expect = require('chai').expect
const { BaseError, HTTP400Error } = require('../src/base-error')
const ErrorHandler = require('../src/error-handler')

describe('error handler', () => {
    const user = undefined
    it('should return an error from api', () => {
        try {
            if (!user) {
                throw new HTTP400Error([user])
            }
        } catch (error) {
            return ErrorHandler.errorHandler(error)
        }
    })
})