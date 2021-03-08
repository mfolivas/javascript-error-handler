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
        
        expect(() => citationFun({})).to.throw(requiredFieldsError)
    })

    it('should return an error with the missing fields', () => {
        const requiredFields = ['id', 'amount', 'agencyFee']
        const record = {
            id: 'some-id',
            amount: 100
        }
        expect(() => BusinessRulesValidations
            .hasMissingAttributes(requiredFields, record))
            .to.throw('The following fields are required: ' + requiredFields.join(', '))
    })

    it('should return the object since all required fields are there', () => {
        const requiredFields = ['foo', 'amount']
        const record = {
            foo: 'bar',
            amount: 100
        }
        const response = BusinessRulesValidations.hasMissingAttributes(requiredFields, record)
        expect(response).to.equal(record)
    })
})