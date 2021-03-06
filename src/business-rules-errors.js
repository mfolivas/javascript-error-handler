const R = require('ramda')
const { InvalidRequestError } = require('./errors')

const validate = R.curry((predicate, message, object) => {
    if (predicate(object)) {
        throw new InvalidRequestError(message)
    }
    return object
})

const hasNoCitationNumber = citation => R.isNil(R.prop('citationNumber', citation))
const validateCitation = validate(hasNoCitationNumber, 'Citation number is required')

const hasMissingAttribute = (object, field) => !R.has(field, object)

const hasMissingAttributes = R.curry((fields, object) => {
    const missingAttributes = R.map(field => hasMissingAttribute(object, field), fields)
    const isMissingRequiredFields = missingAttributes.find(result => result === true)
    if (isMissingRequiredFields) {
        throw new TypeError('The following fields are required: ' + fields.join(', '))
    }
    return object
})

module.exports = {
    validateCitation,
    hasMissingAttributes
}