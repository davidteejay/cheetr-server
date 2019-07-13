const { Types: { ObjectId } } = require('mongoose')

const validateId = id => ObjectId.isValid(id) && new ObjectId(id) == id

module.exports = validateId
