const interactor = require('./interactor')
const errors = require('../components/errors')

const translator = {
    login: async ({ email, password }) => {
        try {
            // no need for required fields validation :)
            // check credentials and return jwt
            return await interactor.login({ email, password })
        } catch (error) {
            // TODO: use customFormatErrorFn to catch and throw errors in translators
            errors(error)
        }
    },
    getById: async ({ id }) => {
        try {
            return await interactor.getById(id)
        } catch (error) {
            errors(error)
        }
    },
    getAll: async () => {
        try {
            return await interactor.getAll()
        } catch (error) {
            errors(error)
        }
    },
    create: async ({ email, password, role }) => {
        try {
            return await interactor.create({ email, password, role })
        } catch (error) {
            errors(error)
        }
    }
}

module.exports = translator

// http://localhost:5000/graphql