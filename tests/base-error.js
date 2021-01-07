const { expect } = require('chai')
const { BaseError, HttpStatusCode, InvalidRequestError } = require('../src/errors')
const ErrorHandler = require('../src/error-handler').errorHandler

const customErrorInstance = new BaseError('BaseError', HttpStatusCode.NOT_FOUND, 'Base Error', false)

const throwFn = () => {
    throw customErrorInstance
}

describe('error handler', () => {
    it('should throw a BaseError (new)', () => {
        expect(throwFn).to.throw(BaseError)
    })

    it('should throw a CustomError (const)', () => {
        expect(throwFn).to.throw(customErrorInstance)
    })

    it('should return a valid JSON', () => {
        const errorJSON = customErrorInstance.toJSON()
        expect(errorJSON.httpStatusCode).to.equal(404)
        expect(errorJSON.description).to.equal('Base Error')
        expect(errorJSON.isOperational).to.equal(false)
    })

    it('should produce a strictly equal error', (done) => {
        try {
            throwFn()
        } catch (e) {
            expect(e !== new BaseError('BaseError', 400, 'Base Error', false), 'Thrown error instance is same as newly constructed! This is impossible!').to.be.true
            expect(e === customErrorInstance, 'Throw error does not match const instance of error').to.be.true
            done()
        }
        expect.fail()
    })

    it('should return missing required fields', () => {
        const requiredFieldsError = new InvalidRequestError('Invalid citation')
        const citationFun = () => {
            throw requiredFieldsError
        }
        expect(citationFun).to.throw(InvalidRequestError)
    })


    it('should return a JSON error whenever it stated as such', async () => {
        const requiredFieldsError = new InvalidRequestError('Invalid citation')
        const citationFun = async () => {
            try {
                throw requiredFieldsError
            } catch (error) {
                return await ErrorHandler(error)
            }
        }
        const results = await citationFun()

        expect(results.name).to.equal('InvalidRequestError')
        expect(results.httpStatusCode).to.equal(400)
        expect(results.description).to.equal('Invalid citation')
        expect(results.name).to.equal('InvalidRequestError')
        expect(results.isOperational).is.true
    })
})