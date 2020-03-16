// converts application errors into apollo errors
const { createError } = require('apollo-errors')

module.exports = error => { throw new (createError(error.name, { message: error.message, customError: true })) }