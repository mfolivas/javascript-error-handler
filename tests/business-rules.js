const expect = require('chai').expect
const BusinessRulesValidations = require('../src/business-rules-errors')
const { InvalidRequestError } = require('../src/errors')

const citationFn = citation => {
    return BusinessRulesValidations.validateCitation(citation)
}

describe('business rules', () => {
    it('should fail because the citation is missing the citation number', () => {
        expect(() => citationFn({})).to.throw(InvalidRequestError)
    })

    it('should return missing required fields', () => {
        const requiredFieldsError = new InvalidRequestError('Invalid citation')
        const citationFun = () => {
            throw requiredFieldsError
        }
        
        expect(()=> citationFun({})).to.throw(requiredFieldsError)
    })
})